/*global MocksHelper, MockL10n, ActivityPicker, MozActivity */

'use strict';

require('/shared/test/unit/mocks/mock_l20n.js');

require('/views/shared/js/activity_picker.js');
require('/views/shared/js/utils.js');

require('/views/shared/test/unit/mock_moz_activity.js');
require('/views/shared/test/unit/mock_utils.js');


var mocksHelperAP = new MocksHelper([
  'MozActivity',
  'Utils'
]).init();

suite('ActivityPicker', function() {
  var realMozL10n, onsuccess, onerror;

  suiteSetup(function() {
    realMozL10n = document.l10n;
    document.l10n = MockL10n;
    mocksHelperAP.suiteSetup();

    onsuccess = function() {};
    onerror = function() {};
  });

  suiteTeardown(function() {
    document.l10n = realMozL10n;
    mocksHelperAP.suiteTeardown();
  });

  setup(function() {
    mocksHelperAP.setup();
  });

  teardown(function() {
    mocksHelperAP.teardown();
  });

  suite('dial', function() {

    test('dial(number) ', function() {
      ActivityPicker.dial('999');

      assert.deepEqual(MozActivity.calls[0], {
        name: 'dial',
        data: { type: 'webtelephony/number', number: '999' }
      });
    });

    test('dial(number, success) ', function() {
      ActivityPicker.dial('999', onsuccess);

      assert.equal(
        MozActivity.instances[0].onsuccess, onsuccess
      );

      assert.deepEqual(MozActivity.calls[0], {
        name: 'dial',
        data: { type: 'webtelephony/number', number: '999' }
      });
    });

    test('dial(number, success, error) ', function() {
      ActivityPicker.dial('999', onsuccess, onerror);

      assert.equal(
        MozActivity.instances[0].onsuccess, onsuccess
      );

      assert.equal(
        MozActivity.instances[0].onerror, onerror
      );

      assert.deepEqual(MozActivity.calls[0], {
        name: 'dial',
        data: { type: 'webtelephony/number', number: '999' }
      });
    });
  });

  suite('email', function() {

    test('email(email) ', function() {
      ActivityPicker.email('a@b.com');

      assert.deepEqual(MozActivity.calls[0], {
        name: 'new',
        data: {
          type: 'mail',
          URI: 'mailto:a@b.com'
        }
      });
    });

    test('email(email, success) ', function() {
      ActivityPicker.email('a@b.com', onsuccess);

      assert.equal(
        MozActivity.instances[0].onsuccess, onsuccess
      );

      assert.deepEqual(MozActivity.calls[0], {
        name: 'new',
        data: {
          type: 'mail',
          URI: 'mailto:a@b.com'
        }
      });
    });

    test('email(email, success, error) ', function() {
      ActivityPicker.email('a@b.com', onsuccess, onerror);

      assert.equal(
        MozActivity.instances[0].onsuccess, onsuccess
      );

      assert.equal(
        MozActivity.instances[0].onerror, onerror
      );

      assert.deepEqual(MozActivity.calls[0], {
        name: 'new',
        data: {
          type: 'mail',
          URI: 'mailto:a@b.com'
        }
      });
    });
  });

  suite('url', function() {

    test('url(url) ', function() {
      ActivityPicker.url('http://mozilla.com');

      assert.deepEqual(MozActivity.calls[0], {
        name: 'view',
        data: {
          type: 'url',
          url: 'http://mozilla.com'
        }
      });
    });

    test('url(url, success) ', function() {
      ActivityPicker.url('http://mozilla.com', onsuccess);

      assert.equal(
        MozActivity.instances[0].onsuccess, onsuccess
      );

      assert.deepEqual(MozActivity.calls[0], {
        name: 'view',
        data: {
          type: 'url',
          url: 'http://mozilla.com'
        }
      });
    });

    test('url(url, success, error) ', function() {
      ActivityPicker.url('http://mozilla.com', onsuccess, onerror);

      assert.equal(
        MozActivity.instances[0].onsuccess, onsuccess
      );

      assert.equal(
        MozActivity.instances[0].onerror, onerror
      );

      assert.deepEqual(MozActivity.calls[0], {
        name: 'view',
        data: {
          type: 'url',
          url: 'http://mozilla.com'
        }
      });
    });
  });

  test('createNewContact', function() {
    ActivityPicker.createNewContact({foo: ['bar']});

    assert.deepEqual(MozActivity.calls[0], {
      name: 'new',
      data: {
        type: 'webcontacts/contact',
        params: { foo: ['bar'] }
      }
    });
  });

  test('addToExistingContact', function() {
    ActivityPicker.addToExistingContact({foo: ['bar']});

    assert.deepEqual(MozActivity.calls[0], {
      name: 'update',
      data: {
        type: 'webcontacts/contact',
        params: { foo: ['bar'] }
      }
    });
  });

  test('viewContact', function() {
    ActivityPicker.viewContact({foo: ['bar']});

    assert.deepEqual(MozActivity.calls[0], {
      name: 'open',
      data: {
        type: 'webcontacts/contact',
        params: { foo: ['bar'] }
      }
    });
  });

  suite('openSettings', function() {
    var params = {
      name: 'configure',
      data: {
        target: 'device',
        section: 'messaging'
      }
    };

    test('openSettings() ', function() {
      ActivityPicker.openSettings();

      assert.deepEqual(MozActivity.calls[0], params);
    });

    test('openSettings(success) ', function() {
      ActivityPicker.openSettings(onsuccess);

      assert.equal(MozActivity.instances[0].onsuccess, onsuccess);
      assert.deepEqual(MozActivity.calls[0], params);
    });

    test('openSettings(success, error) ', function() {
      ActivityPicker.openSettings(onsuccess, onerror);

      assert.equal(MozActivity.instances[0].onsuccess, onsuccess);
      assert.equal(MozActivity.instances[0].onerror, onerror);
      assert.deepEqual(MozActivity.calls[0], params);
    });
  });

});
