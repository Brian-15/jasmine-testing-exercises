describe("Servers test (with setup and tear-down)", function() {
  beforeEach(function () {
    // initialization logic
    serverNameInput.value = 'Alice';
  });

  it('should add a new server to allServers on submitServerInfo()', function () {
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(1);
    expect(allServers['server' + serverId].serverName).toEqual('Alice');
  });

  afterEach(function() {
    // teardown logic
    serverNameInput.value = '';
    allServers = {};
  });
});

describe("Server table update function updateServerTable()", function() {
  beforeEach(function() {
    // initialization logic
    serverNameInput.value = 'TestName';
    serverId = 5;
    allServers = {};
    submitServerInfo();
  });

  it('should update table row', function() {
    updateServerTable();
    expect(document.getElementById('server6')).not.toEqual(null);
  });

  afterEach(function() {
    // teardown logic
    serverTbody.innerHTML = '';
    serverId = 0;
    allServers = {};
    serverNameInput.value = '';
  });
});