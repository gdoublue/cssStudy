
new Vue({
    el:'#app',
    data:{
        seconds:null,
        equation: '0',
        isDecimalAdded: false,
        isOperatorAdded: false,
        isStarted: false,
        displaySmall:false
    },
    methods:{
        result:function () {
            let myDate=new Date()
            let sec = ('0'+ myDate.getSeconds()).slice(-2)
            let mi = myDate.getMinutes()
            let hours = myDate.getHours()
           this.seconds = hours + ':'+ mi + ':' + sec
        },
        Supdate:function () {
            const timer = setInterval(function () {
                this.result()

            }.bind(this),1000)
        },
        isOperator:function(chart){
            return ['+','-','x','÷'].indexOf(chart) >-1
        },
        calculateToggle:function () {
            if (this.isOperatorAdded || !this.isStarted) {
                return
            }

            this.equation = this.equation + '* -1'
            this.calculate()
        },
        calculatePercentage:function () {
            if (this.isOperatorAdded || !this.isStarted) {
                return
            }

            this.equation = this.equation + '* 0.01'
            this.calculate()
        },
        clear:function () {
            this.equation = '0'
            this.isDecimalAdded = false
            this.isOperatorAdded = false
            this.isStarted = false
        },
        append:function(key){
            if(this.equation==='0' && !this.isOperator(key) ) {
                if(key ==='.'){
                    this.equation += key + ''
                    this.isDecimalAdded = true
                }else {
                    this.equation= key +''
                }
                this.isStarted = true
                return
            }
            if(!this.isOperator(key)){
                if(key ==='.' && this.isDecimalAdded){
                    return;
                }
                if(key ==='.'){
                    this.isDecimalAdded = true
                    this.isOperatorAdded = true
                }else{
                    this.isOperatorAdded = false
                }

                this.equation += '' + key
            }

            if (this.isOperator(key) && !this.isOperatorAdded){
                if(this.equation ==='0'){
                    this.isStarted = true
                }
                this.equation += ''+ key
                this.isOperatorAdded = true
                this.isDecimalAdded = false
            }
        },
        calculate:function () {
            if (this.isOperatorAdded || !this.isStarted) {
                return
            }

            let result = this.equation
                .replace(new RegExp('x','g'),'*')
                .replace(new RegExp('÷','g'),'/')
            console.log(result)
            this.equation = parseFloat( eval(result).toFixed(9))
                .toString()

            this.isDecimalAdded = false
            this.isOperatorAdded = false
        },
        backoff:function () {
            let last = this.equation.slice(-1)
            if(last === '.'){
                this.isDecimalAdded = false
            }
            if (this.isOperator(last)){
                this.isOperatorAdded = false
            }

            this.equation = this.equation.slice(0,this.equation.length-1)
        }
    },
    mounted(){
        this.Supdate()
    },
    watch:{
        equation:function (val) {
            if(val.length>10){
                this.displaySmall = true
            }else{
                this.displaySmall = false
            }
        }
    }
})
