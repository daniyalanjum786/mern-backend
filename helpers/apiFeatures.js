class ApiFeatures {
  constructor(dbQuery, urlQueryStr) {
    this.dbQuery = dbQuery;
    this.urlQueryStr = urlQueryStr;
  }

  search() {
    const searchedTerm = this.urlQueryStr
      ? {
          name: { $regex: this.urlQueryStr, $options: "i" }, // case insensitive search in mongodb
        }
      : {};

    this.urlQueryStr = this.dbQuery.find({ ...searchedTerm });
    return this;
  }
}

export default ApiFeatures;

// also not using this class for searching products
