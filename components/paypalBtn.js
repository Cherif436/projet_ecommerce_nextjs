import { useEffect, useRef, useContext } from 'react'
import { patchData } from '../utils/fetchData'
import {DataContext} from '../store/GlobalState'
import {updateItem} from '../store/Actions'

const paypalBtn = ({order}) => {
    const refPaypalBtn = useRef()
    const {state, dispatch} = useContext(DataContext)
    const { auth, orders} = state

    useEffect(() => {
        paypal.Buttons({
            createOrder: function(data, actions) {
              // Cette fonction configure les détails de la transaction, y compris le montant et les détails du poste.
              return actions.order.create({
                purchase_units: [{
                  amount: {
                    value: order.total
                  }
                }]
              });
            },
            onApprove: function(data, actions) {
              // Cette fonction capture les fonds de la transaction.
              dispatch({ type: 'NOTIFY', payload: {loading: true} })

              return actions.order.capture().then(function(details) {

                patchData(`order/payment/${order._id}`, {
                  paymentId: details.payer.payer_id
                }, auth.token)
                .then(res => {
                  if(res.err) return dispatch({ type: 'NOTIFY', payload: {error: res.err} })
                  
                  dispatch(updateItem(orders, order._id, {
                    ...order, 
                    paid: true, dateOfPayment: details.create_time,
                    paymentId: details.payer.payer_id, method: 'Paypal'
                  }, 'ADD_ORDERS'))

                  return dispatch({ type: 'NOTIFY', payload: {success: res.msg} })
                })
                // Cette fonction affiche un message de réussite de la transaction à votre acheteur.
              });
            }
        }).render(refPaypalBtn.current);
    },[])

    return(
        <div ref={refPaypalBtn}></div>
    )
}

export default paypalBtn