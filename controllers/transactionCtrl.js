const transactionModel = require('../models/transactionModel');
const moment = require('moment')
const getAllTransaction = async (req, res) => {
    try {
        const {frequency, type} = req.body
        const transactions = await transactionModel.find({
            date: {
                $gt : moment().subtract(Number(frequency), 'd').toDate()
            },
            userid:req.body.userid,
          ...( type != 'all' && {type}   )}); 
          
        res.status(200).json(transactions);
      
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}
const editTransaction =async(req, res)=>{
try{
await transactionModel.findOneAndUpdate({_id: req.body.transactionId},
    req.body.payload
);
res.status(200).send('Trasaction Edit Successfully')
}
catch(error){

}
}
const deleteTransaction =async(req, res)=>{
    try{
    await transactionModel.findOneAndDelete({_id: req.body.transactionId},
        req.body.payload
    );
    res.status(200).send('TransactionDeleted Successfully')
    }
    catch(error){
    
    }
    }

const addTransaction = async (req, res) => {
    try {
        const newTransaction = new transactionModel(req.body)
        await newTransaction.save()
        res.status(201).send('Transaction Created')
        console.log('Transaction Created');
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);

    }
}


module.exports = { getAllTransaction, addTransaction , editTransaction, deleteTransaction};