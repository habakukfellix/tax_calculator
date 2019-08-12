'use strict';

var response = require('./res');
var connection = require('./conn');

exports.bills = function(req, res) {

	var query = "";

    connection.query('SELECT name as Name, tax_code as Tax_Code, case when tax_code = 1 then "Food & Beverage" when tax_code = 2 then "Tobacco" when tax_code = 3 then "Movie" end as Type, case when tax_code = 1 then "Yes" when tax_code = 2 then "No" when tax_code = 3 then "No" end as Refundable, price as Price, case when tax_code = 1 then price*0.1 when tax_code = 2 then 10+(price*0.02) when tax_code = 3 and price>=100 then (price-100)*0.01 when tax_code = 3 and price > 0 and price < 100 then 0 end as Tax, case when tax_code = 1 then price+(price*0.1) when tax_code = 2 then price+(10+(price*0.02)) when tax_code = 3 and price>=100 then price+((price-100)*0.01) when tax_code = 3 and price > 0 and price < 100 then price+0 end as Amount FROM item', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.index = function(req, res) {
    response.ok("Hello from the Node JS Tax Calculator RESTful API !", res)
};