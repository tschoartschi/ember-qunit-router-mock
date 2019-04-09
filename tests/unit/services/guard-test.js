import {module, test} from 'qunit';
import {setupTest} from 'ember-qunit';
import Service from '@ember/service';
import {ALLOWED_TENANT} from 'ember-qunit-router-mock/services/guard';
module('Unit | Service | guard', function (hooks) {
    setupTest(hooks);
    let lastRoute = undefined;
    let lastArg = undefined;
    class MockRouter extends Service {
        transitionTo(routeName, arg) {
            lastRoute = routeName;
            lastArg = arg;
        }
        getURL() {

        }
    }

    let service = null;

    hooks.beforeEach(async function () {
        this.owner.register('service:router', MockRouter);
        service = this.owner.lookup('service:guard');
        await new Promise((resolve) => setTimeout(() => resolve(), 150));
    });

    test('it exists', function (assert) {
        service.switchTenant();
        assert.equal(lastRoute, 'not-allowed');
        assert.equal(lastArg, 'tenant');
        // Works because Qunit is not doing a dump
        assert.equal(service.current.tenant, ALLOWED_TENANT);
    });

    test('it exists', function (assert) {
        service.switchTenant();
        assert.equal(lastRoute, 'not-allowed');
        assert.equal(lastArg, 'tenant');
        // Assertion is wrong and Qunit does a dump. Then the router breaks and it's not clear that 
        // the test fails because of a wrong assertion. The error says "(0 , _metal.get)(...).getURL is not a function" which is very confusing
        assert.equal(service.current.tenant, {...ALLOWED_TENANT, label: 'NOT CORRECT'});
    });

});
