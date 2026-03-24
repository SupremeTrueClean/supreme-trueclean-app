async function connectWallet(){
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);

  const signer = provider.getSigner();
  const address = await signer.getAddress();

  const user = auth.currentUser;

  if(user){
    await db.collection("users").doc(user.uid).update({
      wallet: address
    });
  }

  alert("Wallet Connected");
}