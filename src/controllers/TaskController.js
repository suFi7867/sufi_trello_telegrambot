const {Trello_API_KEY, Trello_Secret_Token } = process.env; // Environment Variables
const axios = require("axios")

const createBoard = async (name) => {
  try {
    let res = await axios.post(
      `https://api.trello.com/1/boards/?name=${name}&key=${Trello_API_KEY}&token=${Trello_Secret_Token}`
    );
   console.log(res);
    return `Board Created Successfully with Name : ${name}`;
  } catch (e) {
    return "Cant Create try again";
  }
};


const deleteBoard = async (id) => {
  try {
    let res = await axios.delete(
      `https://api.trello.com/1/boards/${id}?key=${Trello_API_KEY}&token=${Trello_Secret_Token}`
    );
  //  console.log(res.data);
    return `Board Deleted Successfully : ${id}`;
  } catch (e) {
    return "Board Not Found";
  }
};


const addListToBoard = async (id, listName) => {

  if(!id) return "ID Not Provided Send Again with Including ID : addNewList_BoardID_ListName";
  if (!listName) return "ListName Not Provided Send Again with Including Listname : addNewList_BoardID_ListName";
  
  try {
    let res = await axios.post(
      `https://api.trello.com/1/boards/${id}/lists?name=${listName}&key=${Trello_API_KEY}&token=${Trello_Secret_Token}`
    );
    //  console.log(res.data);
    return `List Added Successfully Board-ID: ${id}`;
  } catch (e) {
    return "Board Not Found plz send correct ID : addNewList_BoardID_ListName";
  }
};


const addTaskToList = async (ListID, taskName) => {
  if (!ListID)
    return "ID Not Provided Send Again with Including ID : addNewCard_ListID_Taskname";
  if (!taskName)
    return "ListName Not Provided Send Again with Including Listname : addNewCard_ListID_Taskname";

  try {
    let res = await axios.post(
      `https://api.trello.com/1/cards?key=${Trello_API_KEY}&token=${Trello_Secret_Token}&idList=${ListID}&name=${taskName}`
    );
    //  console.log(res.data);
    return `Task Added Successfully List-ID: ${ListID}`;
  } catch (e) {
    return "List Not Found plz send correct ID : addNewCard_ListID_Taskname";
  }
};

const TaskController = {
  createBoard,
  deleteBoard,
  addListToBoard,
  addTaskToList,
};

module.exports = TaskController;

// `https://api.trello.com/1/boards?key=${TRELLO_KEY}&token=${TRELLO_TOKEN}&name=${name}`

// delete
// https://api.trello.com/1/boards/{id}?key={TRELLO_KEY}&token={TRELLO_TOKEN}