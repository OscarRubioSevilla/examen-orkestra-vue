<template>
    <section class="card">
        <div class="card__header">
            <p class="client-name">{{ client.name }}</p>
            <p class="client-email" v-if="client.email">{{ client.email }}</p>
        </div>
        <div class="card__body">
            <div class="client-info">
                <div class="client-info__row">
                    <div class="flex-1 flex justify-content-end">
                        <div class="client-info__group text-center">
                            <p>Celular</p>
                            <div class="flex align-items-center justify-content-center">
                                <p class="client-info__cellphone">{{ phone_format }}</p>
                                <img v-if="!client.verified_cellphone" src="../assets/img/failure.png" class="cellphone-icon">
                                <img v-else src="../assets/img/success.png" class="cellphone-icon">
                            </div>
                        </div>
                    </div>
                    <div class="flex-1 flex">
                        <div class="client-info__group text-center">
                            <p>Ticket más alto</p>
                            <p class="client-info__ticket">{{ client.highest_ticket_amount_format }}</p>
                        </div>
                    </div>
                </div>
                <div class="client-info__row">
                    <div class="flex-1 flex justify-content-end">
                        <div class="client-info__group text-center">
                            <p>Periodo sin compra</p>
                            <p class="client-info__period">{{ client.period_without_purchase_human_format }}</p>
                        </div>
                    </div>
                    <div class="flex-1 flex">
                        <div class="client-info__group text-center">
                        <p>Último contacto</p>
                        <div class="flex align-items-center justify-content-center"> 
                            <img v-if="isNotVisitedRecently" src="../assets/img/warning.png" class="last-contact-icon">
                            <p class="client-info__last-contact">{{ last_contact_human_format || 'N/D' }}</p></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>

import moment from 'moment';

export default {
    props: {
        client: { type: Object, required: true }
    },
    computed: {
        last_contact_human_format() {
            return this.client.last_contact?.last_contact_human_format;
        },
        phone_format() {
            return this.client.cellphone.replace('6', '*').replace('7', '*');
        },
        limit_date() {
            return moment().subtract(60, 'days');
        },
        last_contact_date() {
            return moment(this.client.last_contact?.created_at);
        },
        isNotVisitedRecently() {
            return this.last_contact_date.isBefore(this.limit_date);
        }

    }
}
</script>