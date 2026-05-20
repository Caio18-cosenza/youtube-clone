import React, { useState, useEffect, useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  Switch,
  ActivityIndicator,
  Dimensions,
  Alert,
} from 'react-native';

// ==========================================
// TYPES & INTERFACES
// ==========================================

interface Trade {
  id: string;
  asset: string;
  type: 'BUY' | 'SELL';
  entryPrice: number;
  exitPrice: number;
  amount: number;
  timestamp: string;
  status: 'WIN' | 'LOSS' | 'OPEN';
}

interface UserProfile {
  name: string;
  tier: string;
  balance: number;
  dailyTarget: number;
  riskLockoutEnabled: boolean;
}

interface PerformanceMetric {
  label: string;
  value: string | number;
  change: number;
  isPositive: boolean;
}

// ==========================================
// MOCK DATA
// ==========================================

const MOCK_TRADES: Trade[] = [
  { id: '1', asset: 'EUR/USD', type: 'BUY', entryPrice: 1.0850, exitPrice: 1.0890, amount: 250, timestamp: '14:32:10', status: 'WIN' },
  { id: '2', asset: 'BTC/USD', type: 'SELL', entryPrice: 64200, exitPrice: 64550, amount: 500, timestamp: '14:45:15', status: 'LOSS' },
  { id: '3', asset: 'GBP/USD', type: 'BUY', entryPrice: 1.2610, exitPrice: 1.2645, amount: 150, timestamp: '15:10:02', status: 'WIN' },
  { id: '4', asset: 'AAPL', type: 'BUY', entryPrice: 172.50, exitPrice: 0, amount: 300, timestamp: '15:30:00', status: 'OPEN' },
  { id: '5', asset: 'GOLD', type: 'SELL', entryPrice: 2330, exitPrice: 2322, amount: 400, timestamp: '15:42:18', status: 'WIN' },
  { id: '6', asset: 'ETH/USD', type: 'BUY', entryPrice: 3450, exitPrice: 3410, amount: 200, timestamp: '16:01:11', status: 'LOSS' },
  { id: '7', asset: 'USD/JPY', type: 'SELL', entryPrice: 154.20, exitPrice: 153.95, amount: 600, timestamp: '16:15:35', status: 'WIN' },
  { id: '8', asset: 'TSLA', type: 'BUY', entryPrice: 175.00, exitPrice: 0, amount: 150, timestamp: '16:20:00', status: 'OPEN' },
];

const METRICS: PerformanceMetric[] = [
  { label: 'Win Rate', value: '62.5%', change: 4.2, isPositive: true },
  { label: 'Profit Factor', value: '1.85', change: -0.12, isPositive: false },
  { label: 'Avg Trade Time', value: '14m 20s', change: 1.5, isPositive: true },
  { label: 'Drawdown Max', value: '3.4%', change: -0.8, isPositive: true },
];

// ==========================================
// SUB-COMPONENTS
// ==========================================

const HeaderComponent: React.FC<{ profile: UserProfile }> = ({ profile }) => (
  <View style={styles.headerContainer}>
    <View>
      <Text style={styles.welcomeText}>Welcome back,</Text>
      <Text style={styles.profileName}>{profile.name} ({profile.tier})</Text>
    </View>
    <View style={styles.balanceBadge}>
      <Text style={styles.balanceLabel}>Equity</Text>
      <Text style={styles.balanceValue}>${profile.balance.toLocaleString()}</Text>
    </View>
  </View>
);

const MetricCard: React.FC<{ metric: PerformanceMetric }> = ({ metric }) => (
  <View style={styles.metricCard}>
    <Text style={styles.metricLabel}>{metric.label}</Text>
    <Text style={styles.metricValue}>{metric.value}</Text>
    <Text style={[styles.metricChange, { color: metric.isPositive ? '#4CD964' : '#FF3B30' }]}>
      {metric.change > 0 ? `+${metric.change}` : metric.change}% this week
    </Text>
  </View>
);

interface TradeRowProps {
  trade: Trade;
  onPress: (trade: Trade) => void;
}

const TradeRow: React.FC<TradeRowProps> = ({ trade, onPress }) => {
  const statusColor = trade.status === 'WIN' ? '#4CD964' : trade.status === 'LOSS' ? '#FF3B30' : '#FFCC00';
  
  return (
    <TouchableOpacity style={styles.tradeRow} onPress={() => onPress(trade)}>
      <View style={styles.tradeInfoLeft}>
        <View style={[styles.typeBadge, { backgroundColor: trade.type === 'BUY' ? '#4CD96422' : '#FF3B3022' }]}>
          <Text style={[styles.typeText, { color: trade.type === 'BUY' ? '#4CD964' : '#FF3B30' }]}>
            {trade.type}
          </Text>
        </View>
        <View style={styles.assetMeta}>
          <Text style={styles.assetName}>{trade.asset}</Text>
          <Text style={styles.tradeTime}>{trade.timestamp}</Text>
        </View>
      </View>
      
      <View style={styles.tradeInfoRight}>
        <Text style={styles.tradeAmount}>${trade.amount}</Text>
        <Text style={[styles.statusText, { color: statusColor }]}>{trade.status}</Text>
      </View>
    </TouchableOpacity>
  );
};

// ==========================================
// MAIN COMPONENT
// ==========================================

export default function AppDashboard() {
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterType, setFilterType] = useState<'ALL' | 'WIN' | 'LOSS' | 'OPEN'>('ALL');
  const [trades, setTrades] = useState<Trade[]>(MOCK_TRADES);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Alex Trader',
    tier: 'PRO VIP',
    balance: 42550.75,
    dailyTarget: 500,
    riskLockoutEnabled: true,
  });

  // Simulated API fetch
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Filter logic using useMemo
  const filteredTrades = useMemo(() => {
    return trades.filter((trade) => {
      const matchesSearch = trade.asset.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterType === 'ALL' || trade.status === filterType;
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, filterType, trades]);

  const handleTradePress = (trade: Trade) => {
    Alert.alert(
      `Trade Details: ${trade.asset}`,
      `Type: ${trade.type}\nEntry: ${trade.entryPrice}\nExit: ${trade.exitPrice || 'N/A'}\nRisk Amount: $${trade.amount}`,
      [{ text: 'Dismiss', style: 'cancel' }]
    );
  };

  const handleAddQuickTrade = () => {
    const newTrade: Trade = {
      id: Math.random().toString(),
      asset: 'USDC/BRL',
      type: 'BUY',
      entryPrice: 5.15,
      exitPrice: 0,
      amount: 100,
      timestamp: new Date().toLocaleTimeString(),
      status: 'OPEN',
    };
    setTrades([newTrade, ...trades]);
  };

  const toggleRiskLockout = (value: boolean) => {
    setUserProfile((prev) => ({ ...prev, riskLockoutEnabled: value }));
    Alert.alert(
      'Risk Engine Updated',
      value ? 'Lockout mechanism is now ACTIVE.' : 'Lockout mechanism is DEACTIVATED.'
    );
  };

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#0A84FF" />
        <Text style={styles.loadingText}>Loading Ledger Metrics...</Text>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <HeaderComponent profile={userProfile} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Analytics Segment */}
        <Text style={styles.sectionTitle}>Weekly Overview</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.metricsWrapper}
        >
          {METRICS.map((item, index) => (
            <MetricCard key={index} metric={item} />
          ))}
        </ScrollView>

        {/* Risk Configuration Segment */}
        <View style={styles.controlPanelCard}>
          <Text style={styles.panelTitle}>Risk Management Controls</Text>
          <View style={styles.controlRow}>
            <View style={styles.controlTextContainer}>
              <Text style={styles.controlLabel}>Automated Profit Lockout</Text>
              <Text style={styles.controlDesc}>Freezes trading if daily drawdown exceeds threshold</Text>
            </View>
            <Switch
              value={userProfile.riskLockoutEnabled}
              onValueChange={toggleRiskLockout}
              trackColor={{ false: '#3A3A3C', true: '#34C759' }}
              thumbColor="#FFFFFF"
            />
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.controlRow}>
            <Text style={styles.controlLabel}>Daily Target Goals</Text>
            <Text style={styles.targetValue}>${userProfile.dailyTarget} USD</Text>
          </View>
        </View>

        {/* Action Controls */}
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleAddQuickTrade}>
            <Text style={styles.buttonText}>+ Queue Instant Trade</Text>
          </TouchableOpacity>
        </View>

        {/* Ledger Filtering Segment */}
        <View style={styles.ledgerHeaderRow}>
          <Text style={styles.sectionTitle}>Journal Entries</Text>
          <Text style={styles.countIndicator}>{filteredTrades.length} records</Text>
        </View>

        <TextInput
          style={styles.searchBarInput}
          placeholder="Search entry by asset symbol..."
          placeholderTextColor="#8E8E93"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <View style={styles.filterTabsRow}>
          {(['ALL', 'WIN', 'LOSS', 'OPEN'] as const).map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.filterTabButton, filterType === tab && styles.activeFilterTab]}
              onPress={() => setFilterType(tab)}
            >
              <Text style={[styles.filterTabText, filterType === tab && styles.activeFilterText]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Core Entries List Container */}
        <View style={styles.listContainer}>
          {filteredTrades.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No matching assets found.</Text>
            </View>
          ) : (
            filteredTrades.map((item) => (
              <TradeRow key={item.id} trade={item} onPress={handleTradePress} />
            ))
          )}
        </View>

        {/* Dummy Appendices to Extend File Layout Depth */}
        <View style={styles.footerInfoBox}>
          <Text style={styles.footerHeader}>Data Synchronicity Notice</Text>
          <Text style={styles.footerParagraph}>
            All operational statistics rendering within this module simulate high-velocity data feeds. 
            Do not employ these placeholder endpoints for active deployment environments. 
            Ensure cryptographic security validation protocols are hardcoded at the networking abstraction layers.
          </Text>
          <Text style={styles.footerVersion}>System Engine Build: v2.4.12-TSX</Text>
        </View>

      </ScrollView>
    </View>
  );
}

// ==========================================
// ARCHITECTURAL DESIGN SHEET (STYLES)
// ==========================================

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#1C1C1E',
    paddingTop: 60,
  },
  centeredContainer: {
    flex: 1,
    backgroundColor: '#1C1C1E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 15,
    color: '#AEAEB2',
    fontSize: 15,
    fontWeight: '500',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  welcomeText: {
    fontSize: 14,
    color: '#8E8E93',
    fontWeight: '400',
  },
  profileName: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '700',
    marginTop: 2,
  },
  balanceBadge: {
    backgroundColor: '#2C2C2E',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
    alignItems: 'flex-end',
  },
  balanceLabel: {
    fontSize: 11,
    color: '#8E8E93',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  balanceValue: {
    fontSize: 16,
    color: '#30D158',
    fontWeight: '700',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  metricsWrapper: {
    paddingLeft: 20,
    marginBottom: 25,
    flexDirection: 'row',
  },
  metricCard: {
    backgroundColor: '#2C2C2E',
    width: width * 0.38,
    padding: 16,
    borderRadius: 16,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#38383A',
  },
  metricLabel: {
    fontSize: 13,
    color: '#AEAEB2',
    fontWeight: '500',
  },
  metricValue: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '700',
    marginVertical: 6,
  },
  metricChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  controlPanelCard: {
    backgroundColor: '#2C2C2E',
    marginHorizontal: 20,
    padding: 18,
    borderRadius: 16,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#38383A',
  },
  panelTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#AEAEB2',
    marginBottom: 15,
  },
  controlRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  controlTextContainer: {
    flex: 0.8,
  },
  controlLabel: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  controlDesc: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 4,
    lineHeight: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#38383A',
    marginVertical: 15,
  },
  targetValue: {
    fontSize: 16,
    color: '#0A84FF',
    fontWeight: '600',
  },
  actionContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  primaryButton: {
    backgroundColor: '#0A84FF',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0A84FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  ledgerHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 20,
  },
  countIndicator: {
    fontSize: 13,
    color: '#8E8E93',
  },
  searchBarInput: {
    backgroundColor: '#2C2C2E',
    marginHorizontal: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    color: '#FFFFFF',
    fontSize: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#38383A',
  },
  filterTabsRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  filterTabButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#2C2C2E',
    marginRight: 8,
  },
  activeFilterTab: {
    backgroundColor: '#0A84FF',
  },
  filterTabText: {
    color: '#AEAEB2',
    fontSize: 13,
    fontWeight: '600',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  tradeRow: {
    backgroundColor: '#2C2C2E',
    padding: 16,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#38383A',
  },
  tradeInfoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeBadge: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginRight: 12,
  },
  typeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  assetMeta: {
    justifyContent: 'center',
  },
  assetName: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  tradeTime: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 2,
  },
  tradeInfoRight: {
    alignItems: 'flex-end',
  },
  tradeAmount: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
    marginTop: 4,
    letterSpacing: 0.5,
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: '#8E8E93',
    fontSize: 14,
  },
  footerInfoBox: {
    marginTop: 35,
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: '#151516',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#222224',
  },
  footerHeader: {
    fontSize: 13,
    fontWeight: '600',
    color: '#AEAEB2',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  footerParagraph: {
    fontSize: 12,
    color: '#636366',
    lineHeight: 18,
  },
  footerVersion: {
    fontSize: 11,
    color: '#48484A',
    marginTop: 15,
    textAlign: 'right',
    fontStyle: 'italic',
  },
});
