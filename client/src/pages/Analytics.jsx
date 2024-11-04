// Analytics.js
import React from 'react';
import { Progress } from 'antd';

const Analytics = ({ allTransaction }) => {
  const totalTransaction = allTransaction.length;

  // Separate income and expense transactions
  const totalIncomeTransactions = allTransaction.filter(transaction => transaction.type === 'income');
  const totalExpenseTransactions = allTransaction.filter(transaction => transaction.type === 'expense');

  // Calculate percentages
  const totalIncomePercent = (totalIncomeTransactions.length / totalTransaction) * 100;
  const totalExpensePercent = (totalExpenseTransactions.length / totalTransaction) * 100;

  // Calculate turnover amounts and percentages
  const totalIncome = totalIncomeTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  const totalExpense = totalExpenseTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  const totalTurnover = totalIncome + totalExpense;
  const incomeTurnoverPercent = (totalIncome / totalTurnover) * 100;
  const expenseTurnoverPercent = (totalExpense / totalTurnover) * 100;

  return (
    <>
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              Total Transactions: {totalTransaction}
            </div>
            <div className="card-body">
              <h5 className='text-success'>Income: {totalIncomeTransactions.length}</h5>
              <h5 className='text-danger'>Expense: {totalExpenseTransactions.length}</h5>
              <div>
                <Progress
                  type='circle'
                  strokeColor='green'
                  className='mx-2'
                  percent={totalIncomePercent.toFixed(0)}
                />
                <Progress
                  type='circle'
                  strokeColor='red'
                  className='mx-2'
                  percent={totalExpensePercent.toFixed(0)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* New Card for Total Turnover with Circular Progress */}
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              Total Turnover: {totalTurnover.toFixed(0)}
            </div>
            <div className="card-body">
              <h5 className='text-success'>Income Amount: {totalIncome.toFixed(0)}</h5>
              <h5 className='text-danger'>Expense Amount: {totalExpense.toFixed(0)}</h5>
              <div>
                <Progress
                  type='circle'
                  strokeColor='green'
                  className='mx-2'
                  percent={incomeTurnoverPercent.toFixed(0)}
                />
                <Progress
                  type='circle'
                  strokeColor='red'
                  className='mx-2'
                  percent={expenseTurnoverPercent.toFixed(0)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;
