module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      pairContract: String,
      sell_limit: Number,
      buy_limit: Number,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Pair_Info = mongoose.model("pair_info", schema);
  return Pair_Info;
};
