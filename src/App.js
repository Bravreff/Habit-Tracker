
import { useState } from 'react';
import './App.css';

export default function App(){
  const [habits,setHabits]=useState([]);
  function handleAddItems(habit){
    setHabits((habits)=>[...habits, habit])
  }
  function handleDeleteHabits(id){
    setHabits((habits)=>habits.filter((habit) => habit.id !== id))
  }
  function handleToggleHobit(id){
    setHabits((habits)=>
    habits.map((habit)=>
    habit.id === id ?{...habit, packed: !habit.packed}: habit))
  }
  return(
    <div className="app">
    <Logo/>
    <HabitInput onAddHabit={handleAddItems}/>
    <HabitList habits={habits} onDeleteHabits={handleDeleteHabits} onToggleHobit={handleToggleHobit}/>
 </div>
  )
}
function Logo(){
  return(<div>
    <h1>Habit&Tracker</h1>
  </div>
)}
function HabitInput({onAddHabit}){
  const [description , setDescription]= useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e){
    if(!description) return ;
    e.preventDefault();
    const hobitArr ={ description , quantity , packed: false , id: Date.now()}
    console.log(hobitArr);
    console.log(e);
    setDescription("");
    setQuantity(1);
    onAddHabit(hobitArr);
  }
 return(
  <form className="add-form" onSubmit={handleSubmit}>
     <h3>Add a new habit to  your day</h3>
      <select value={quantity} 
       onChange={e => setQuantity(Number(e.target.value))}>
       {Array.from({length:20}, (_,i) => i + 1).map(num =>( <option value={num} key={num} >{num}</option>))}
      </select>
      <input type="text" placeholder=" add  new habit " value={description} 
      onChange={e => setDescription(e.target.value)}></input>
      <button>add</button>
    </form>
 )
}
function HabitList({habits, onDeleteHabits , onToggleHobit}){
 return(
  <div className="list">
  <ul>{
    habits.map((habit)=>(<Item habit={habit}
       key={habit.id}
       onDeleteHabits={onDeleteHabits} onToggleHobit={onToggleHobit}/>))
    }</ul>
</div>
 )
}
function Item ({habit, onDeleteHabits, onToggleHobit}){
  return(
 <li>
   <input type='checkbox' value={habit.packed} onChange={()=>onToggleHobit(habit.id)}></input>
   <span style={habit.packed ?{textDecoration: "line-through"}:{}}>
    {habit.quantity} {habit.description} {""}
   </span>
   <button  onClick={()=>onDeleteHabits(habit.id)}>X</button>
 </li>
  )
  
}