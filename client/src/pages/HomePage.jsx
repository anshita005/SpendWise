import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button, Modal, message, Table, Layout, Menu, Divider, DatePicker } from 'antd';
import { DashboardOutlined, PlusOutlined, PieChartOutlined, BarChartOutlined, LogoutOutlined, UserOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import Analytics from './Analytics';
import Categories from './Categories';
import './HomePage.css';

const { Sider, Content } = Layout;

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [allTransaction, setAllTransaction] = useState([]);
  const [frequency, setFrequency] = useState('7');
  const [type, setType] = useState('all');
  const [activePage, setActivePage] = useState('dashboard');
  const [editable, setEditable] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (activePage === 'dashboard') getAllTransaction();
  }, [frequency, type, activePage]);

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date) => new Date(date).toLocaleDateString('en-CA'), // Format date using toLocaleDateString
    },
    { title: 'Amount', dataIndex: 'amount', key: 'amount' },
    { title: 'Type', dataIndex: 'type', key: 'type' },
    { title: 'Category', dataIndex: 'category', key: 'category' },
    { title: 'Reference', dataIndex: 'reference', key: 'reference' },
    { title: 'Description', dataIndex: 'description', key: 'description' }, // Added Description column
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <div>
          <EditOutlined style={{ color: 'blue', cursor: 'pointer' }} onClick={() => {
            setEditable(record);
            setShowModal(true);
          }} />
          <DeleteOutlined style={{ color: 'red', cursor: 'pointer', marginLeft: '10px' }} onClick={() => handleDelete(record)} />
        </div>
      ),
    },
  ];

  const getAllTransaction = async () => {
    try {
      // const res = await axios.post('/api/v1/transactions/get-transaction', { userid: user._id, frequency, type });
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/transactions/get-transaction`, { userid: user._id, frequency, type });
      console.log(res.data); // Log the response data to check its structure
      setAllTransaction(res.data);
      if (setAllTransaction) {
        console.log('true', res.data);
      }
    } catch (error) {
      message.error('Failed to fetch transactions');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const handleDelete = async (record) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/transactions/delete-transaction`, { transactionId: record._id });
      message.success('Transaction deleted successfully');
      getAllTransaction(true);
    } catch (error) {
      message.error('Failed to delete transaction');
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (editable) {
        // Edit existing transaction
        await axios.post(`${process.env.REACT_APP_API_URL}/transactions/edit-transaction`, { payload: { ...values, userid: user._id }, transactionId: editable._id });
        message.success('Transaction edited successfully');
      } else {
        // Add new transaction
        await axios.post(`${process.env.REACT_APP_API_URL}/transactions/add-transaction`, { ...values, userid: user._id });
        message.success('Transaction added successfully');
      }
      setShowModal(false);
      setEditable(null); // Reset editable state
      getAllTransaction(); // Refresh transactions
    } catch (error) {
      message.error('Failed to save transaction');
    }
  };

  return (
    <Layout style={{ maxHeight: '100vh', backgroundColor: 'white' }}>
      <Sider
        style={{
          backgroundColor: '#002766',
          position: 'fixed',
          height: '100%',
          zIndex: 1,
          boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
        }}
      >
        <div style={{ padding: '20px', textAlign: 'center', color: '#ffffff', fontSize: '24px', fontWeight: 'bold' }}>
          SpendWise
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '10px 20px',
            color: '#ffffff',
            gap: '10px',
            marginBottom: '20px',
            backgroundColor: '#003a8c',
            borderRadius: '8px',
          }}
        >
          <UserOutlined style={{ fontSize: '18px', color: '#ffffff' }} />
          <span style={{ fontSize: '16px', fontWeight: '500', color: '#ffffff' }}>
            {user?.name}
          </span>
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          style={{
            background: 'transparent',
            color: '#ffffff',
            borderRight: 'none',
          }}
          theme="dark"
        >
          <Menu.Item key="1" icon={<DashboardOutlined />} style={{ marginBottom: '10px' }} onClick={() => setActivePage('dashboard')}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="2" icon={<PlusOutlined />} style={{ marginBottom: '10px' }} onClick={() => {
            setEditable(null); // Reset editable for new transaction
            setShowModal(true);
          }}>
            Add Transaction
          </Menu.Item>
          <Menu.Item key="3" icon={<PieChartOutlined />} style={{ marginBottom: '10px' }} onClick={() => setActivePage('analytics')}>
            Analytics
          </Menu.Item>
          <Menu.Item key="4" icon={<BarChartOutlined />} style={{ marginBottom: '10px' }} onClick={() => setActivePage('categories')}>
            Categories
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout style={{ marginLeft: 200 }}>
        <Content style={{ padding: '24px', marginTop: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '50px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h6 style={{ marginBottom: 0 }}>Select Type</h6>
              <Select value={type} onChange={setType} style={{ width: 120 }}>
                <Select.Option value="all">All</Select.Option>
                <Select.Option value="expense">Expense</Select.Option>
                <Select.Option value="income">Income</Select.Option>
              </Select>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h6 style={{ marginBottom: 0 }}>Select Frequency</h6>
              <Select value={frequency} onChange={setFrequency} style={{ width: 150 }}>
                <Select.Option value="0">Today</Select.Option>
                <Select.Option value="7">Last 1 Week</Select.Option>
                <Select.Option value="30">Last 1 Month</Select.Option>
                <Select.Option value="365">Last 1 Year</Select.Option>
              </Select>
            </div>
          </div>

          <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 3 }}>
            <Button
              icon={<LogoutOutlined />}
              onClick={handleLogout}
              style={{
                color: 'white',
                backgroundColor: '#ff4d4f',
                borderColor: '#ff4d4f',
              }}
            >
              Logout
            </Button>
          </div>
          <div className="divider">
            <Divider style={{ margin: '20px 0', backgroundColor: '#91d5ff' }} />
          </div>

          <div className="content">
            {activePage === 'dashboard' ? (
              <Table columns={columns} dataSource={allTransaction} pagination={{ pageSize: 5 }} />
            ) : activePage === 'analytics' ? (
              <Analytics allTransaction={allTransaction} />
            ) : activePage === 'categories' ? (
              <Categories allTransaction={allTransaction} />
            ) : null}
          </div>

          <Modal
            visible={showModal}
            onCancel={() => {
              setShowModal(false);
              setEditable(null); // Reset editable state when modal is closed
            }}
            footer={null}
            centered
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h5 style={{ textAlign: 'center', marginBottom: '20px' }}>
                {editable ? 'Edit Transaction' : 'Add Transaction'}
              </h5>

              <div style={{ width: '100%', maxWidth: '450px', padding: '10px', borderRadius: '10px', backgroundColor: '#ffffff' }}>
                <Form onFinish={handleSubmit} initialValues={editable} layout="vertical">

                  {/* New Date Form Item */}
                  <Form.Item
                    label="Date"
                    name="date"
                    labelCol={{ span: 24 }}
                    rules={[{ required: true, message: 'Please select the date' }]}

                  >
                    <DatePicker style={{ width: '100%' }} />
                  </Form.Item>

                  <Form.Item
                    label="Amount"
                    name="amount"
                    labelCol={{ span: 24 }}
                    rules={[{ required: true, message: 'Please enter the amount' }]}
                    style={{ textAlign: 'center' }} // Center the label text
                  >
                    <Input type="text" placeholder="Enter amount" style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item
                    label="Type"
                    name="type"
                    labelCol={{ span: 24 }}
                    rules={[{ required: true, message: 'Please select the type' }]}
                  >
                    <Select placeholder="Select type" style={{ width: '100%' }}>
                      <Select.Option value="expense">Expense</Select.Option>
                      <Select.Option value="income">Income</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label="Category"
                    name="category"
                    labelCol={{ span: 24 }}
                    rules={[{ required: true, message: 'Please select the category' }]}
                  >
                    <Select placeholder="Select category" style={{ width: '100%' }}>
                      <Select.Option value="food">Food</Select.Option>
                      <Select.Option value="transport">Transport</Select.Option>
                      <Select.Option value="entertainment">Entertainment</Select.Option>
                      <Select.Option value="utilities">Utilities</Select.Option>
                      <Select.Option value="clothing">Clothing</Select.Option>
                      <Select.Option value="health">Health</Select.Option>
                      <Select.Option value="travel">Travel</Select.Option>
                      <Select.Option value="education">Education</Select.Option>
                      <Select.Option value="other">Other</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label="Reference"
                    name="reference"
                    labelCol={{ span: 24 }}
                    style={{ textAlign: 'center' }} // Center the label text
                  >
                    <Input type="text" placeholder="Enter reference" style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item
                    label="Description"
                    name="description"
                    labelCol={{ span: 24 }}
                    style={{ textAlign: 'center' }} // Center the label text
                  >
                    <Input.TextArea rows={3} placeholder="Enter description" style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item style={{ textAlign: 'center' }}>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                      {editable ? 'Update' : 'Add'}
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </Modal>


        </Content>
      </Layout>
    </Layout>
  );
};

export default HomePage;
