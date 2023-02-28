export function initPayPal(price, showModal){

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
                    amount:{
                        value: price
                    },
                    description: 'Purchase Unit test description',
                }]
            })
        },
    
        onApprove:(data,actions)=>{
            actions.order.capture().then((res)=>{
                showModal(res)
            })
        },

        onClose:(data,actions)=>{
            console.log('close');
        },
      }).render('.js-paypal');
}