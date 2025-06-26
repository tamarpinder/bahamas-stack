import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BalanceHistoryPage({ onBack }) {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const mockTransactions = [
    {
      id: 'BPL567890',
      type: 'Bill Payment',
      company: 'Bahamas Power & Light',
      amount: -125.50,
      date: '2024-01-15',
      status: 'Completed',
      icon: 'flash',
      iconColor: '#F59E0B'
    },
    {
      id: 'WSC234567',
      type: 'Bill Payment', 
      company: 'Water & Sewerage Corporation',
      amount: -89.25,
      date: '2024-01-14',
      status: 'Completed',
      icon: 'water',
      iconColor: '#06B6D4'
    },
    {
      id: 'LBT123456',
      type: 'Bank Transfer',
      company: 'John Smith',
      amount: -500.00,
      date: '2024-01-13',
      status: 'Completed',
      icon: 'swap-horizontal',
      iconColor: '#F97316'
    },
    {
      id: 'CBL789012',
      type: 'Bill Payment',
      company: 'Cable Bahamas',
      amount: -95.75,
      date: '2024-01-12',
      status: 'Completed',
      icon: 'tv',
      iconColor: '#8B5CF6'
    },
    {
      id: 'DEP345678',
      type: 'Deposit',
      company: 'Direct Deposit - Salary',
      amount: 2500.00,
      date: '2024-01-10',
      status: 'Completed',
      icon: 'add-circle',
      iconColor: '#10B981'
    }
  ];

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'payments', label: 'Payments' },
    { key: 'transfers', label: 'Transfers' },
    { key: 'deposits', label: 'Deposits' }
  ];

  const filteredTransactions = mockTransactions.filter(transaction => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'payments') return transaction.type === 'Bill Payment';
    if (selectedFilter === 'transfers') return transaction.type.includes('Transfer');
    if (selectedFilter === 'deposits') return transaction.type === 'Deposit';
    return true;
  });

  const currentBalance = 1649.50;

  const renderTransaction = ({ item }) => (
    <View style={styles.transactionCard}>
      <View style={styles.transactionLeft}>
        <View style={[styles.transactionIcon, { backgroundColor: `${item.iconColor}20` }]}>
          <Ionicons name={item.icon} size={24} color={item.iconColor} />
        </View>
        <View style={styles.transactionDetails}>
          <Text style={styles.transactionTitle}>{item.company}</Text>
          <Text style={styles.transactionType}>{item.type}</Text>
          <Text style={styles.transactionDate}>{new Date(item.date).toLocaleDateString()}</Text>
        </View>
      </View>
      <View style={styles.transactionRight}>
        <Text style={[
          styles.transactionAmount,
          item.amount > 0 ? styles.positiveAmount : styles.negativeAmount
        ]}>
          {item.amount > 0 ? '+' : ''}${Math.abs(item.amount).toFixed(2)}
        </Text>
        <View style={[
          styles.statusBadge,
          item.status === 'Completed' ? styles.completedBadge : styles.processingBadge
        ]}>
          <Text style={[
            styles.statusText,
            item.status === 'Completed' ? styles.completedText : styles.processingText
          ]}>
            {item.status}
          </Text>
        </View>
        <Text style={styles.transactionId}>#{item.id}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color="#6B7280" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Balance & History</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <View style={styles.balanceIcon}>
              <Ionicons name="wallet" size={32} color="#3B82F6" />
            </View>
            <View>
              <Text style={styles.balanceLabel}>Current Balance</Text>
              <Text style={styles.balanceAmount}>${currentBalance.toFixed(2)}</Text>
            </View>
          </View>
          
          <View style={styles.balanceActions}>
            <TouchableOpacity style={styles.balanceAction}>
              <Ionicons name="add" size={20} color="#10B981" />
              <Text style={[styles.actionText, { color: '#10B981' }]}>Add Money</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.balanceAction}>
              <Ionicons name="send" size={20} color="#3B82F6" />
              <Text style={[styles.actionText, { color: '#3B82F6' }]}>Send Money</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Filter Tabs */}
        <View style={styles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter.key}
                style={[
                  styles.filterTab,
                  selectedFilter === filter.key && styles.activeFilterTab
                ]}
                onPress={() => setSelectedFilter(filter.key)}
              >
                <Text style={[
                  styles.filterTabText,
                  selectedFilter === filter.key && styles.activeFilterTabText
                ]}>
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Transactions List */}
        <View style={styles.transactionsContainer}>
          <Text style={styles.transactionsTitle}>Recent Transactions</Text>
          <FlatList
            data={filteredTransactions}
            renderItem={renderTransaction}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  balanceCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  balanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  balanceIcon: {
    width: 64,
    height: 64,
    backgroundColor: '#EFF6FF',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
  },
  balanceActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  balanceAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionText: {
    fontSize: 16,
    fontWeight: '500',
  },
  filterContainer: {
    marginBottom: 24,
  },
  filterTab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  activeFilterTab: {
    backgroundColor: '#3B82F6',
  },
  filterTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  activeFilterTabText: {
    color: 'white',
  },
  transactionsContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  transactionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  transactionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  transactionIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 2,
  },
  transactionType: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  positiveAmount: {
    color: '#10B981',
  },
  negativeAmount: {
    color: '#EF4444',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginBottom: 4,
  },
  completedBadge: {
    backgroundColor: '#D1FAE5',
  },
  processingBadge: {
    backgroundColor: '#FEF3C7',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  completedText: {
    color: '#10B981',
  },
  processingText: {
    color: '#F59E0B',
  },
  transactionId: {
    fontSize: 10,
    color: '#9CA3AF',
  },
});