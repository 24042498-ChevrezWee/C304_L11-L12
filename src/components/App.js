import { useState } from "react";

function Logo() {
  return <h1>My Travel List</h1>;
}

function Form({ onAddItem, search, setSearch }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description.trim()) return;

    const newItem = { id: Date.now(), description: description, quantity: quantity, packed: false };
    
    onAddItem(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need to pack?</h3>

      <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>

      <input type="text" placeholder="Item..." value={description} onChange={(e) => setDescription(e.target.value)} />

      <button type="submit">Add</button>
      
      <input className="search" type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
    </form>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input type="checkbox" checked={item.packed} onChange={() => onToggleItem(item.id)} />

      <span style={{ textDecoration: item.packed ? "line-through" : "none" }}>
        {item.quantity} {item.description}
      </span>

      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function PackingList({ items, onDeleteItem, onToggleItem, search }) {
  const filteredItems = items.filter((item) => item.description.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="list">
      {filteredItems.length > 0 ? (
        <ul>
          {filteredItems.map((item) => (
            <Item key={item.id} item={item} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} />
          ))}
        </ul>
      ) : (
        <p className="empty-message">{items.length === 0 ? "No items in the list." : "No items match your search."}</p>
      )}
    </div>
  );
}

function Stats({ items }) {
  if (items.length === 0) {
    return (
      <footer className="stats">
        <em>Start adding some items to your packing list!</em>
      </footer>
    );
  }

  const totalItems = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const percentagePacked = Math.round((packedItems / totalItems) * 100);

  return (
    <footer className="stats">
      <em>You have {totalItems} items in the list. You already packed {packedItems} ({percentagePacked}%).</em>
    </footer>
  );
}

function App() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  
  function handleAddItem(item) {
    setItems((currentItems) => [...currentItems, item]);
  }

  function handleDeleteItem(itemId) {
    setItems((currentItems) => currentItems.filter((item) => item.id !== itemId));
  }

  function handleToggleItem(itemId) {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === itemId ? { ...item, packed: !item.packed } : item
      )
    );
  }
  

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} search={search} setSearch={setSearch} />
      <PackingList items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem} search={search} />
      <Stats items={items} />
    </div>
  );
}

export default App;
