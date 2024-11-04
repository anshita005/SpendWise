// Categories.js
import React from 'react';
import { Progress, Card, Row, Col } from 'antd';

const Categories = ({ allTransaction }) => {
  const totalTransactions = allTransaction.length;

  // Calculate the count of transactions per category for Income and Expense
  const categoryCount = allTransaction.reduce((acc, transaction) => {
    const type = transaction.type; // Assuming each transaction has a type: 'income' or 'expense'
    const category = transaction.category;

    // Initialize nested object for income and expense categories
    if (!acc[type]) {
      acc[type] = {};
    }

    acc[type][category] = (acc[type][category] || 0) + 1;
    return acc;
  }, { income: {}, expense: {} });

  // Prepare data for Income and Expense categories
  const incomeCategories = Object.keys(categoryCount.income).map((category) => ({
    name: category,
    count: categoryCount.income[category],
    percentage: ((categoryCount.income[category] / totalTransactions) * 100).toFixed(0),
  }));

  const expenseCategories = Object.keys(categoryCount.expense).map((category) => ({
    name: category,
    count: categoryCount.expense[category],
    percentage: ((categoryCount.expense[category] / totalTransactions) * 100).toFixed(0),
  }));

  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={16}>
        <Col span={12}>
          <Card 
            title="Income Categories" 
            bordered={false} 
            style={{ 
              borderRadius: '8px', 
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)', 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column' 
            }}
          >
            {incomeCategories.map((transaction) => (
              <div key={transaction.name} style={{ marginBottom: '16px' }}>
                <Row justify="space-between" align="middle" style={{ width: '100%' }}>
                  <Col>
                    <span style={{ fontWeight: '600', color: '#4CAF50' }}>{transaction.name}</span>
                  </Col>
                  <Col span={18}>
                    <Progress percent={transaction.percentage} strokeColor="#4CAF50" />
                  </Col>
                </Row>
              </div>
            ))}
          </Card>
        </Col>
        <Col span={12}>
          <Card 
            title="Expense Categories" 
            bordered={false} 
            style={{ 
            color: 'Black',
              borderRadius: '8px', 
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)', 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column' 
            }}
          >
            {expenseCategories.map((transaction) => (
              <div key={transaction.name} style={{ marginBottom: '16px' }}>
                <Row justify="space-between" align="middle" style={{ width: '100%' }}>
                  <Col>
                    <span style={{ fontWeight: '600', color: '#F44336' }}>{transaction.name}</span>
                  </Col>
                  <Col span={18}>
                    <Progress percent={transaction.percentage} strokeColor="#F44336" />
                  </Col>
                </Row>
              </div>
            ))}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Categories;
// Categories.js
// import React from 'react';
// import { Progress, Card, Row, Col } from 'antd';

// const Categories = ({ allTransaction }) => {
//   const totalTransactions = allTransaction.length;

//   // Calculate the count of transactions per category for Income and Expense
//   const categoryCount = allTransaction.reduce((acc, transaction) => {
//     const type = transaction.type; // Assuming each transaction has a type: 'income' or 'expense'
//     const category = transaction.category;

//     // Initialize nested object for income and expense categories
//     if (!acc[type]) {
//       acc[type] = {};
//     }

//     acc[type][category] = (acc[type][category] || 0) + 1;
//     return acc;
//   }, { income: {}, expense: {} });

//   // Prepare data for Income and Expense categories
//   const incomeCategories = Object.keys(categoryCount.income).map((category) => ({
//     name: category,
//     count: categoryCount.income[category],
//     percentage: ((categoryCount.income[category] / totalTransactions) * 100).toFixed(0) || 0,
//   }));

//   const expenseCategories = Object.keys(categoryCount.expense).map((category) => ({
//     name: category,
//     count: categoryCount.expense[category],
//     percentage: ((categoryCount.expense[category] / totalTransactions) * 100).toFixed(0) || 0,
//   }));

//   return (
//     <div style={{ padding: '20px' }}>
//       <Row gutter={16}>
//         <Col span={12}>
//           <Card 
//             title="Income Categories" 
//             bordered={false} 
//             style={{ 
//               borderRadius: '8px', 
//               boxShadow: '0 2px 10px rgba(0,0,0,0.1)', 
//               height: '100%', 
//               display: 'flex', 
//               flexDirection: 'column' 
//             }}
//           >
//             {incomeCategories.map((transaction) => (
//               <div key={transaction.name} style={{ marginBottom: '16px' }}>
//                 <Row justify="space-between" align="middle" style={{ width: '100%' }}>
//                   <Col>
//                     <span style={{ fontWeight: '600', color: '#4CAF50' }}>{transaction.name}</span>
//                   </Col>
//                   <Col span={18}>
//                     <Progress 
//                       percent={transaction.count > 0 ? transaction.percentage : 0} 
//                       strokeColor="#4CAF50" 
//                       format={() => (transaction.count > 0 ? `${transaction.percentage}%` : '0%')} 
//                     />
//                   </Col>
//                 </Row>
//               </div>
//             ))}
//           </Card>
//         </Col>
//         <Col span={12}>
//           <Card 
//             title="Expense Categories" 
//             bordered={false} 
//             style={{ 
//               color: 'Black',
//               borderRadius: '8px', 
//               boxShadow: '0 2px 10px rgba(0,0,0,0.1)', 
//               height: '100%', 
//               display: 'flex', 
//               flexDirection: 'column' 
//             }}
//           >
//             {expenseCategories.map((transaction) => (
//               <div key={transaction.name} style={{ marginBottom: '16px' }}>
//                 <Row justify="space-between" align="middle" style={{ width: '100%' }}>
//                   <Col>
//                     <span style={{ fontWeight: '600', color: '#F44336' }}>{transaction.name}</span>
//                   </Col>
//                   <Col span={18}>
//                     <Progress 
//                       percent={transaction.count > 0 ? transaction.percentage : 0} 
//                       strokeColor="#F44336" 
//                       format={() => (transaction.count > 0 ? `${transaction.percentage}%` : '0%')} 
//                     />
//                   </Col>
//                 </Row>
//               </div>
//             ))}
//           </Card>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default Categories;
