export function initPayPal(price){

    paypal.Buttons({
        style: {
          layout: 'vertical',
          color:  'black',
          shape:  'rect',
          label:  'paypal'
        },
    
        createOrder:(data,actions)=>{
            return actions.order.create({
                purchase_units:[{
                    amoun:{
                        currency_code: 'UAH',
                        value:price
                    },
                    description: 'Purchase Unit test description',
                }]
            })
        },
    
        onApprove:(data,actions)=>{
            actions.order.capture().then((res)=>{
                console.log(res);
            })
        },
      }).render('.js-test');
}