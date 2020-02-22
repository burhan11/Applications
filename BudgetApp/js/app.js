// BUDGET CONTROLLER
var budgetController = (function() {

    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    }

    Expense.prototype.calcPercentage = function(totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1;
        }
        return this.percentage;
    }

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var data = {
        items: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    }

    return {
        addItems: function(type, des, val) {
            var newItem, ID;

            // Specify an ID
            if (data.items[type].length > 0) {
                ID = data.items[type][data.items[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            // Add new item on basis of 'inc' or 'exp'
            if (type === 'inc') {
                newItem = new Income(ID, des, val);
            } else if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            }

            // Add items to data structure
            data.items[type].push(newItem);

            // Return new item
            return newItem;
        },

        deleteItems: function(id, type) {
            var fieldsArray, index;
            var fieldsArray = data.items[type].map(function(current, index, array) {
                return current.id;
            });
            index = fieldsArray.indexOf(id);
            Array.prototype.splice.call(data.items[type], index, 1);
        },

        calculateBudget: function(type) {
            var sum = 0;

            data.items[type].forEach(function(current, index, array) {
                sum += current.value;
            });
            data.totals[type] = sum;
            data.budget = data.totals.inc - data.totals.exp;
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }
        },

        calculatePercentage: function() {
            var exppercent;
            // Calculate Expense Percentage
            var exppercent = data.items.exp.map(function(current, index, array) {
                return current.calcPercentage(data.totals.inc);
            });
            return exppercent;
        },

        getBudget: function() {
            var budgetValues;
            budgetValues = {
                updIncome: data.totals.inc,
                updExpense: data.totals.exp,
                updBudget: data.budget,
                updPercentage: data.percentage
            }
            return budgetValues;
        },

        testing: function() {
            console.log(data);
        }
    }

})();

// UI CONTROLLER
var UIController = (function() {

    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        income_list: '.income__list',
        expenses_list: '.expenses__list',
        income_value: '.budget__income--value',
        expense_value: '.budget__expenses--value',
        budget_value: '.budget__value',
        percentage_value: '.budget__expenses--percentage',
        container: '.container',
        exppercentage: '.item__percentage',
        dateLabel: '.budget__title--month'
    }

    return {
        inputvalues: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
        },

        additems: function(type, obj) {
            var html, newHtml, appendClass;

            if (type === 'inc') {
                appendClass = DOMstrings.income_list;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                appendClass = DOMstrings.expenses_list;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            document.querySelector(appendClass).insertAdjacentHTML('beforeend', newHtml);
        },

        deleteItems: function(selectedID) {
            var element = document.getElementById(selectedID);
            element.parentNode.removeChild(element);
        },

        clearFields: function() {
            var fields;

            fields = document.querySelectorAll(DOMstrings.inputDescription + ',' + DOMstrings.inputValue);
            fields.forEach(function(current, index, array) {
                current.value = "";
            });

            fields[0].focus();
        },

        setBudget: function(obj) {
            document.querySelector(DOMstrings.income_value).textContent = obj.updIncome;
            document.querySelector(DOMstrings.expense_value).textContent = obj.updExpense;
            document.querySelector(DOMstrings.budget_value).textContent = obj.updBudget;
            if (obj.updIncome > 0) {
                document.querySelector(DOMstrings.percentage_value).textContent = obj.updPercentage + '%';
            } else {
                document.querySelector(DOMstrings.percentage_value).textContent = '--';
            }

        },

        displayPercentage: function(allPercentage) {
            var nodeList, i;
            i = 0;
            // Return nodeList (Don't have forEach method)
            var nodeList = document.querySelectorAll(DOMstrings.exppercentage);
            nodeList.forEach(function(current, index, array) {
                if (allPercentage[i] > 0) {
                    current.textContent = allPercentage[i] + '%';
                } else {
                    current.textContent = '--';
                }
                i++;
            });
        },

        displayDate: function() {
            var now, year, month;
            now = new Date();
            months = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            year = now.getFullYear();
            month = now.getMonth();
            document.querySelector(DOMstrings.dateLabel).textContent = months[month] + ' ' + year;
        },

        getDOMstrings: function() {
            return DOMstrings;
        }
    }
})();


// GLOBAL APP CONTROLLER
// Integrate other 2 modules
var controller = (function(budgetCtrl, UICtrl) {

    var setupEventListerner = function() {
        var DOM = UICtrl.getDOMstrings();
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
        document.addEventListener('keypress', function(event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

    };

    var updateBudget = function() {

        // Calculate the budget
        budgetCtrl.calculateBudget('inc');
        budgetCtrl.calculateBudget('exp');

        // Return Updated Budget
        var budgetValues = budgetCtrl.getBudget();

        // Display the budget on the UI
        UICtrl.setBudget(budgetValues);
    };

    var ctrlAddItem = function() {
        var input, newItem;
        // Get input values
        input = UICtrl.inputvalues();

        // Add the item to budgetController
        newItem = budgetCtrl.addItems(input.type, input.description, input.value);

        // Add item to UIController
        UICtrl.additems(input.type, newItem);

        // Clear the input fields
        UICtrl.clearFields();

        // Update budget
        updateBudget();

        updatePercentage();
    };

    ctrlDeleteItem = function(event) {
        var target, splitID, type, ID;
        target = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if (target) {
            splitID = target.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);

            budgetCtrl.deleteItems(ID, type);

            UIController.deleteItems(target);

            updateBudget();

            updatePercentage();
        }
    };

    updatePercentage = function() {
        // Update Expense Percentage in BudgetController
        var allPercentage = budgetCtrl.calculatePercentage();

        // Update UI with Expense Percentage
        UICtrl.displayPercentage(allPercentage);
    };

    return {
        init: function() {
            console.log('Application stated');
            UICtrl.displayDate();
            updateBudget();
            setupEventListerner();
        }
    };

})(budgetController, UIController);

controller.init();