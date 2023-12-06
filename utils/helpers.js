//Handlebar custom helpers
module.exports = {

    //Format date as DD/MM/YY (Transaction screen)
    format_date: (date) => {
        return `${new Date(date).getDate()}/${new Date(date).getMonth() + 1}/${new Date(date).getFullYear().toString().substr(-2)}`;
    },

    format_currency: (cost) => {
        return `$ ${cost}`;
    },


};

