import { NOTIFICATIONS_SERVICE } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { never } from 'rxjs';
import Stripe from 'stripe';
import { PaymentsCreateChargeDto } from './dto/payments-create-charge.dto';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY'),
    {
      apiVersion: "2023-10-16"
    }
  );

  constructor(
    private readonly configService: ConfigService,
    @Inject(NOTIFICATIONS_SERVICE) private readonly notificationsService: ClientProxy
  ) {}

  async createCharge({ amount, email }: PaymentsCreateChargeDto) {
    /*const paymentMethod = await this.stripe.paymentMethods.create({
      type: 'card',
      card
    });*/

    const paymentIntent = await this.stripe.paymentIntents.create({
      payment_method: 'pm_card_visa',
      amount: amount * 100,
      confirm: true,
      //payment_method_types: ['card'],
      //automatic_payment_methods: {enabled: true},
      return_url: 'http://localhost:3000/reservations/',
      currency: 'usd'
    })

    //this.notificationsService.emit('notify_email', { email });

    return paymentIntent;
  }
}
