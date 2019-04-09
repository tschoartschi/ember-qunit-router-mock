import Service, {inject as service} from '@ember/service';

export const ALLOWED_TENANT = {label: 'i am allowed'};

export default Service.extend({
    router: service(),

    // eslint-disable-next-line
    current: {
        tenant: ''
    },

    switchTenant() {
        // do a lot of logic here and 
        // decided if we redirect or not

        // assume we are in the not allowed branch
        this.router.transitionTo('not-allowed', 'tenant');

        // I do not know why the model could have the router?!?
        // maybe ember-data? ember-mirage? ember-simple-auth?!?
        // the next line is just to demonstrate the behaviour is experience! We do not do this in our code
        // maybe this happens because of some addon?
        ALLOWED_TENANT.router = this.router;
        this.set('current.tenant', ALLOWED_TENANT);
    }
});
