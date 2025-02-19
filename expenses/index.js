import { createApp } from "vue";
import { GraffitiLocal } from "@graffiti-garden/implementation-local";
import { GraffitiPlugin } from "@graffiti-garden/wrapper-vue";
import { GraffitiPersonalDataPlugin } from "@graffiti-garden/wrapper-vue-personal-data";

fetch("./data.json")
  .then((response) => response.json())
  .then((defaultExpenses) => {
    createApp({
      data() {
        return {
          myData: {
            expenses: defaultExpenses,
          },
        };
      },

      methods: {
        /**
         * Currency convert function stub.
         * In a real app, you would use an API to get the latest exchange rates,
         * and we'd need to support all currency codes, not just EUR, USD and GBP.
         * However, for the purposes of this assignment, this is fine.
         * @param {"EUR" | "USD" | "GBP"} from - Currency code to convert from
         * @param {"EUR" | "USD" | "GBP"} to - Currency code to convert to
         * @param {number} amount - Amount to convert
         * @returns {number} Converted amount
         */
        currencyConvert(from, to, amount) {
          const rates = {
            USD: 1,
            EUR: 0.96,
            GBP: 0.79,
          };

          return (amount * rates[to]) / rates[from];
        },
      },

      computed: {
        total_balance() {
          let total = 0;

          for (let expense of this.expenses) {
            let trinity_paid = expense.trinity_paid ?? 0;
            let neo_paid = expense.neo_paid ?? 0;
            let trinity_paid_for_neo = expense.trinity_paid_for_neo ?? 0;
            let neo_paid_for_trinity = expense.neo_paid_for_trinity ?? 0;

            total +=
              (trinity_paid - neo_paid) / 2 +
              trinity_paid_for_neo -
              neo_paid_for_trinity;
          }

          return total;
        },
      },
    })
      .use(GraffitiPlugin, {
        graffiti: new GraffitiLocal(),
      })
      .use(GraffitiPersonalDataPlugin)
      .mount("#app");
  });
