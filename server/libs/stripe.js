import Stripe from "stripe";

import config from "../configs/config.js";
const stripe = new Stripe(config.stripe.secretKey);

export default stripe;
