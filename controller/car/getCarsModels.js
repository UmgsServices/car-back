const fetch = import('node-fetch');

const getCarModels=async () => {
  const response = await fetch(
    'https://parseapi.back4app.com/classes/Car_Model_List?keys=Make',
    {
      headers: {
        'X-Parse-Application-Id': 'hlhoNKjOvEhqzcVAJ1lxjicJLZNVv36GdbboZj3Z', // This is the fake app's application id
        'X-Parse-Master-Key': 'SNMJJF0CZZhTPhLDIqGhTlUNV9r60M2Z5spyWfXW', // This is the fake app's readonly master key
      }
    }
  );
  const data = await response.json(); // Here you have the data that you need
  console.log(JSON.stringify(data, null, 2));
}
module.exports=getCarModels