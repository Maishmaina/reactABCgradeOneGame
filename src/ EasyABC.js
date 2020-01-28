import React, { Component } from 'react';
import classNames from 'classnames';
import alphabets from './alphabets.json';
export class  EasyABC extends Component {
 constructor(props){
     super(props);
     this.state={
      alphabets: alphabets,
      currentPosition: 0,
      currentTick:0,
     }
      this.next=this.next.bind(this);
     
 }  
//  componentDidMount(){
//      let letterSound=document.querySelector(`audio[data-key="letter"]`);
//      letterSound.play();
//  } 
//  playSound(){
//     let letterSound=document.querySelector(`audio[data-key="letter"]`);
//     let wordSound=document.querySelector(`audio[data-key="word"]`);   
//    console.log('Play sound'); 
// }
 next(){
if(this.state.currentPosition === this.state.alphabets.length -1){
    this.setState({currentPosition: 0, currentTick:0 })
    if(this.state.currentTick < 2){
        this.setState({currentTick: this.state.currentTick + 1 });

     }else{ 
        this.setState({currentPosition: 0, currentTick:0 });

      }
}else{
 if(this.state.currentTick < 2){
    this.setState({currentTick: this.state.currentTick + 1 });
 }else{ 
this.setState({currentPosition: this.state.currentPosition + 1 , currentTick:0});
  }
}
// this.playSound();
 }
 prev=()=>{
  console.log('Prevoues button was Clicked');
  if(this.state.currentPosition > 0 ){
      this.setState({currentPosition :this.state.currentPosition -1 });
  }else{
      this.setState({currentPosition: this.state.alphabets.length-1});  
    } 
 }
 render() {
     let showImage = this.state.currentTick !== 0 ? true : false;
     let showWord = this.state.currentTick === 2 ? true : false;
     console.log(this.state.currentTick, showImage);
  return (
<div className="game">
<div>
 <div className="fields">
<div className="field-block">
{ this.state.alphabets[this.state.currentPosition].letter }    
</div>  
{/* <audio src={this.state.alphabets[this.state.currentPosition].letterSound} data-key="letter" />    */}
</div> 
<div className="buttons">
<a  className="button prev" onClick={this.prev}>Prevous</a>
<a  className="button sound">Pay Sound</a>
<a  className="button next" onClick={this.next}>Next</a>
</div>
<div className="fields">
<div className="field-block">
<div className="left-field">
<div className={classNames("placeholder-span", {hide: showImage})}>Click Next To View Image</div> 
<img className={classNames("letter-image", {hide: !showImage})} alt={this.state.alphabets[this.state.currentPosition].word} src={this.state.alphabets[this.state.currentPosition].image}/>   
{/* <audio src={this.state.alphabets[this.state.currentPosition].wordSound} data-key="word" /> */}
</div>
<div className="right-field"><div className={classNames("placeholder-span", {hide: showWord})}>Click Next To View Speeling</div>
<div className={classNames("word", {hide: !showWord})}>
{this.state.alphabets[this.state.currentPosition].word.toUpperCase()}
</div>
</div>  
</div>     
</div>   
</div>
</div>
 )
  }
}

export default  EasyABC
