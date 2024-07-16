const Transaction= require('../models/transaction.model');

exports.getTransactions = async (req, res) => {
  console.log("🚀 ~ exports.getTransactions= ~ req:", req.query)
  try {
    const transactions = await Transaction.find({ userName: req.query.userName})
      .sort({ createdAt: -1 })
      .limit(100);  // Limitamos a las últimas 100 transacciones por rendimiento

    res.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};

// Función auxiliar para registrar una nueva transacción
exports.logTransaction = async (userId, type) => {
  try {
    const transaction = new Transaction({
      userName: userId,
      type: type
    });
    await transaction.save();
  } catch (error) {
    console.error('Error logging transaction:', error);
  }
};