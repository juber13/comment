console.log("daf")
const addCommentBtn = document.querySelector('#add-comment');
const textarea = document.querySelector('.comment-input');
let commentContainer = document.querySelector('.comment-container');
let data = [];

function addToLocalStorage(data){
  localStorage.setItem('str' , JSON.stringify(data));
}

function getToLocalStorage(){
  let getFromLocalStorage = JSON.parse(localStorage.getItem('str'));
  if(getFromLocalStorage.length > 0 ){
    for(var  i = 0; i < getFromLocalStorage.length; i++){
      let obj  = {};
      obj['name'] = getFromLocalStorage[i].name;
      obj['likes'] = getFromLocalStorage[i].likes;
      obj['replys'] = getFromLocalStorage[i].replys;
      data.push(obj);
      createComment(data[i].name , data[i].likes , i , data[i].replys);
    }
  }
  
  return getFromLocalStorage;
}

function removeErrorClass(){
  if(textarea.classList.contains('error')){
    textarea.classList.remove('error');
  }
}


function addComment(){
  commentContainer.innerHTML = "";
  let textAearValue = textarea.value;
  if(textAearValue === null || textAearValue === ""){
    textarea.classList.add('error');
    return;
  }
  let obj = {};
  obj['name'] = textAearValue;
  obj['likes'] = 0;
  obj['replys'] = [];
  data.push(obj);
  for(let i = 0; i < data.length; i++){
      let commentOutPut = createComment(data[i].name , data[i].likes , i);
      commentContainer.appendChild(commentOutPut);
  }
  
  addToLocalStorage(data);
  textarea.value = "";  
}



function createComment(comment_text ,like , index){  

  let comment_section = document.createElement('div');
 comment_section.setAttribute('class' , 'comment-section  ')
 
  let text_div = document.createElement('div');
  let h5 = document.createElement('h5');
  h5.textContent = `${comment_text}`;
  
  
  
 let replyComment = document.createElement('textarea');
    replyComment.placeholder = "Reply here!!"
    replyComment.classList.add('active')
  
 let action_btns = document.createElement('div');
 action_btns.setAttribute('class','action-btns');
  
 let reply_button = document.createElement('button');
 reply_button.textContent = "Reply";
 reply_button.setAttribute('class' , 'reply btn btn-primary btn-sm m-1');
 reply_button.setAttribute('data-id' , 'reply');
  reply_button.setAttribute('data-index' , index);


 
  let like_button = document.createElement('button');
  like_button.textContent  = like > 0 ? like + " Like" : "Like";
  like_button.setAttribute('class' , 'like-btn btn btn-success btn-sm m-1');
  like_button.setAttribute('data-id' , 'like');
  like_button.setAttribute('data-index' , index);


  
 let delete_button = document.createElement('button');
  delete_button.textContent = "Delete";
  delete_button.setAttribute('class' , 'delete-btn btn btn-danger btn-sm m-1');
  delete_button.setAttribute('data-id' , 'delete');
  delete_button.setAttribute('data-index' , index);

 
  
  action_btns.appendChild(reply_button);
  action_btns.appendChild(like_button);
  action_btns.appendChild(delete_button);
  
  text_div.appendChild(h5);
  
  comment_section.appendChild(text_div);
  comment_section.appendChild(replyComment);
  comment_section.appendChild(action_btns);
  commentContainer.appendChild(comment_section); 
  // return comment_section;
  let btns = comment_section.querySelectorAll('.btn');
  getAllBtns(btns , replyComment);
  return comment_section;
}

function getAllBtns(btns , replyComment){
  btns.forEach(btn => btn.addEventListener("click" , function(e){
    let btnId = e.target.dataset;
    if(btnId.id === "reply") reply(btnId.index , e.target , replyComment);
    if(btnId.id === "like") increaseLike(btnId.index , e.target);
    if(btnId.id === "delete")  deleteComment(btnId.index , e.target);
  })) 
}

function reply(index , target , replyComment){
    replyComment.classList.toggle('active');
    let replyValue = replyComment.value;
    if(replyComment.classList.contains('active')){
      target.textContent = "Reply";
      replyCommentFunc()
      if(replyValue == ""){
        alert("please add reply value");
      }else{ 
        let replys = data[index].replys;
        replys.push(replyValue);
        addToLocalStorage();
        // console.log(data)
      }
    }else{
      target.textContent = "Add";
    }
};

// replyCommentFunc();
// createComment(();

function increaseLike(index , target){
  data[index].likes += 1;
  target.textContent = data[index].likes + " Like";
  addToLocalStorage();
}

function deleteComment(index , target){
  commentContainer.removeChild(target.parentElement.parentElement);
   data.splice(index , 1);
   addToLocalStorage(data)
}




// console.log(commentContainer.querySelector('.comment-section').parent);


addCommentBtn.addEventListener("click" , addComment);
textarea.addEventListener("blur" , removeErrorClass)
// replyCommentFunc()
getToLocalStorage();