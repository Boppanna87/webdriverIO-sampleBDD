var globalTestData = function() {
    this.testData = {
        prodcutID: ''
        
    };
    this.setField= function(field,value) {
        this.testData[field] = value;
    };

};
module.exports = new globalTestData();
