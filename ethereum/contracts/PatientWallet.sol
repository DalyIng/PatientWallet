pragma solidity ^0.4.17;

contract PatientWalletFactory {
    address private manager;
    mapping(address => address) public deployedPatientWalletAddress;
    
    modifier onlyManager() {
        require(msg.sender == manager);
        _;
    }
    
    function PatientWalletFactory() public {
        manager = msg.sender;
    }
    
    function getManagerAddress() public view onlyManager returns(address) {
        return manager;
    }
    
    function createPatientWallet(string name, string birthDate, string bloodGroup, uint weight, string addressDetails, string mailAdrress, string password) public {
        address newPatientWallet = new PatientWallet(name, birthDate, bloodGroup, weight, addressDetails, mailAdrress, password, msg.sender);
        deployedPatientWalletAddress[msg.sender] = newPatientWallet;
    }

}

contract PatientWallet{
    
    struct Patient{
        string name;
        string birthDate;
        string bloodGroup;
        uint weight;
        string addressDetails;
        string mailAdrress;
        address patientAddress;
        string password;
    }
    
    struct MedRecord{
        string labName;
        address labAddress;
        string illness;
        string documentType;
        uint256 date;
        string ipfsHash;
        string bitlyLink;
        
    }
    
    mapping(address => bool) public confirmedDoctors; 
    //getter and setter for struct nod implemented yet, that's why they are public
    MedRecord[] public medRecords;
    Patient public patient;
    //gettes and setters done!
    string private profilePictureHash;
    address private walletAddress;
    uint walletBalance;
    
    modifier restricted() {
        require(msg.sender == patient.patientAddress || confirmedDoctors[msg.sender] == true);
        _;
    }
     
   function PatientWallet(string name, string birthDate, string bloodGroup, uint weight, string addressDetails, string mailAdrress, string password, address creator) public {
        patient = Patient({
           name: name,
           birthDate: birthDate,
           bloodGroup: bloodGroup,
           weight: weight,
           addressDetails: addressDetails,
           mailAdrress: mailAdrress,
           patientAddress: creator,
           password: password
        });
   }
   
    function createMedicalRecord(string labName, address labAddress, string illness, string documentType, string ipfsHash, string bitlyLink ) public restricted {
        MedRecord memory newMedRecord = MedRecord({
            labName: labName,
            labAddress: labAddress,
            illness: illness,
            documentType: documentType,
            date: now,
            ipfsHash: ipfsHash,
            bitlyLink: bitlyLink
        });
        medRecords.push(newMedRecord);
        confirmedDoctors[labAddress] = true;
    }
    
    
    function getMedRecordsCount() public view returns (uint) {
        return medRecords.length;
    }
    
    function addDoctor(address doctorAddress) public restricted {
        confirmedDoctors[doctorAddress] = true;
    }
    
    function setProfilePictureHash(string hash) public restricted {
        profilePictureHash = hash;
    }
    
    function getProfilePictureHash() public view restricted returns(string) {
        return profilePictureHash;
    }
    
    function setWalletAddress(address _walletAddress) public {
        walletAddress = _walletAddress;
    }
    
    function getWalletAddress() public view restricted returns(address) {
        return walletAddress;
    }
    
    /*function getProfile() public view restricted returns(
        string,
        string,
        string,
        uint,
        string,
        string,
        address,
        string
        ) {
        
        return (
                    patient.name,
                    patient.birthDate,
                    patient.bloodGroup,
                    patient.weight,
                    patient.addressDetails,
                    patient.mailAdrress,
                    patient.patientAddress,
                    patient.password
                );
    }
    
    function financeWallet() public payable restricted {
        walletBalance = this.balance;
    }
    
    function payLab(address recipient, uint value) public restricted {
        recipient.transfer(value);   
    }

    function getBalance() public view restricted returns(uint) {
        return(this.balance);
    }*/
}