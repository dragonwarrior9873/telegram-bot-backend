module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      wallet_address: String,
      mnemonics: String,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Wallet_Info = mongoose.model("wallet_info", schema);
  return Wallet_Info;
};
