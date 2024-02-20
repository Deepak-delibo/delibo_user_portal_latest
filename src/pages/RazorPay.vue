<template>
  <div class="bg-gray-100 border border-2 m-5 p-5">
      <div class="flex justify-center items-center mt-4">
          <div class="grid grid-cols-1">
              <div class="text-sm  px-2 py-2 m-3 text-black bg-gray-100 "> Make your first payment using RazorPay Payment Gateway. Use Card number : 4718 6091 0820 4366, Expiry :12/99 CVV : 123, OTP :12345</div>

              <div class="w-full flex items-center justify-center">
                  <div @click="authenticateSubscription" class="w-[120px] cursor-pointer text-center text-sm  px-2 py-2 border border-gray-300 text-black bg-[#c2e7ff] "> Pay 10 INR</div>
              </div>

              <table v-if="payment_done" class="px-2 py-5 mt-5" >
                  <tr>
                      <th>User Name</th> <td>Pankaj kumar</td>
                  </tr>
                  <tr>
                      <th>User Email</th> <td>nit***@gmail.com</td>
                  </tr>
                  <tr>
                      <th>Payment ID</th> <td>{{payment_id}}</td>
                  </tr>
                  <tr>
                      <th>Payment Status</th> <td>{{payment_status}}</td>
                  </tr>
                  <tr>
                      <th>Payment Response</th> <td>{{response}}</td>
                  </tr>
              </table>

              <a  href="/" class="text-small border-2 rounded-md px-2 py-2 m-5 text-center justify-center"> Go Back</a>
          </div>
      </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  props:['order_id'], // it is optional and will required if your using PHP.
  data(){
    return{
      script: `https://checkout.razorpay.com/v1/checkout.js`,
      key_id : "rzp_test_290ihMmNd8b6zi",
      key_secrete : import.meta.env.VITE_RAZORPAY_SECRET,
      payment_done:false,
      payment_id:"",
      payment_status:"",
      response:"",
      paymentMethods: ['card', 'netbanking', 'wallet', 'emi', 'upi'] // Available payment methods
    }
  },
  methods :{
    async loadRazorPay() {
      return new Promise(resolve=>{
        const script = document.createElement('script')
        script.src = this.script
        script.onload = () =>{
          resolve(true)
        }
        script.onerror = (e) =>{
          console.log(e)
          resolve(true)
        }
        document.body.appendChild(script)
      })
    },
    async authenticateSubscription(){
      const result = await this.loadRazorPay()
      if(!result){
        Swal.fire('Warning!' , 'Failed to load razor-pay!' ,'error');
        return
      }

      var options = {
        "key": this.key_id,
        "amount": 1000, //  Hence, 10 rupees in paise
        "currency": 'INR',
        "name": "Test Payment",
        "description": "Test Payment ",
        "prefill": {
          "name": 'Pankaj kumar',
          "email":'demo@example.com',
          "contact": '9031****',
          "method": this.selectedPaymentMethod // Use selected payment method
        },
        "theme": {
          "color": "#3399cc"
        },
        "handler": (response)=>{
          this.response =response;
          this.payment_status = 'Success';
          this.payment_id = response.razorpay_payment_id
          this.payment_done = true;
        }
      };

      var rzp = new Razorpay(options);
      rzp.on('payment.failed', (response)=>{
        this.payment_status = 'Failed';
        this.response =response;
        this.payment_done = true;
        this.payment_id = response.error.metadata.payment_id
      });
      rzp.open();
    },
  },
  async created(){
    if( this.order_id ){
      this.authenticateSubscription()
    }

    // card :  4718 6091 0820 4366
  }
}
</script>
