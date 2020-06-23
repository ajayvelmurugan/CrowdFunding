pragma solidity ^0.4.17;

contract CampaignFactory {
    struct campaignStruct{
        address campaignAddress;
        string campaignTitle;
        string campaignDescription;
    }
    
    mapping(address => campaignStruct) campaingsDeployed;
    
    address[] public campaignsAddress;

    function createCampaign(string title, string description, uint minimum) public {
        address newCampaign = new Campaign(title, description, minimum, msg.sender);
        var _campaign= campaingsDeployed[newCampaign];
        
        _campaign.campaignAddress= newCampaign;
        _campaign.campaignTitle= title;
        _campaign.campaignDescription= description;
        
        campaignsAddress.push(newCampaign) -1;
        
        
    }

    function getDeployedCampaigns() public view returns (address[]) {
        return campaignsAddress;
    }
    
    function getDeployedCampaign(address temp) view public returns (address, string, string){
        return(campaingsDeployed[temp].campaignAddress, campaingsDeployed[temp].campaignTitle, campaingsDeployed[temp].campaignDescription);
    }
    
    function countDeployedCampaigns() view public returns (uint){
        return campaignsAddress.length;
    }
}

contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;
    string campaignTitle;
    string campaignDescription;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    function Campaign(string title, string description, uint minimum, address creator) public {
        manager = creator;
        campaignTitle= title;
        campaignDescription= description;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);

        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(string description, uint value, address recipient) public restricted {
        Request memory newRequest = Request({
           description: description,
           value: value,
           recipient: recipient,
           complete: false,
           approvalCount: 0
        });

        requests.push(newRequest);
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];

        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];

        require(request.approvalCount > (approversCount / 2));
        require(!request.complete);

        request.recipient.transfer(request.value);
        request.complete = true;
    }

    function getSummary() public view returns (
      string, string, uint, uint, uint, uint, address
      ) {
        return (
           campaignTitle,
           campaignDescription,
          minimumContribution,
          this.balance,
          requests.length,
          approversCount,
          manager
        );
    }


    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }
}

