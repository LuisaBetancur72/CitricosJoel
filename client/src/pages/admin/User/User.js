import React, { useState , useEffect } from 'react';
import {Typography, Dialog, List, ListItem, ListItemText, IconButton} from '@mui/material';
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {Card, CardContent, CardMedia} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import './User.scss';
import Naranja from "../../../assets/png/naranjavalencia.png";
import Mandarina from "../../../assets/png/Mandarina.png";
import Limon from "../../../assets/png/Limon.png";
import Tangelo from "../../../assets/png/Tangelo.png";


export const User = (props) =>{
  const { handleOptionClick, selectedOption } = props;
  const [cartItems, setCartItems] = useState([]);
  const [openCart, setOpenCart] = useState(false);
  const [purchasedItems, setPurchasedItems] = useState([]);
  const [userData, setUser] = useState(null);


  const post = [
    { Id: "1", title: "Naranja Valencia", subtitle: "Primera", Precio: 1000, Create_at: "11/10/23", avatar: Naranja },
    { Id: "2", title: "Naranja Tangelo", subtitle: "Primera", Precio: 1000, Create_at: "11/10/23", avatar: Tangelo },
    { Id: "3", title: "Limon Tahiti", subtitle: "Primera", Precio: 1000, Create_at: "11/10/23", avatar: Limon},
    { Id: "4", title: "Mandarina Oneco", subtitle: "Primera", Precio: 1000, Create_at: "11/10/23", avatar: Mandarina },
    { Id: "5", title: "Naranja Valencia", subtitle: "Segunda", Precio: 1000, Create_at: "11/10/23", avatar: Naranja },
    { Id: "6", title: "Naranja Tangelo", subtitle: "Segunda", Precio: 1000, Create_at: "11/10/23", avatar: Tangelo },
    { Id: "7", title: "Limon Tahiti", subtitle: "Segunda", Precio: 1000, Create_at: "11/10/23", avatar: Limon},
    { Id: "8", title: "Mandarina Oneco", subtitle: "Segunda", Precio: 1000, Create_at: "11/10/23", avatar: Mandarina },
    { Id: "9", title: "Naranja Valencia", subtitle: "Tercera", Precio: 1000, Create_at: "11/10/23", avatar: Naranja },
    { Id: "10", title: "Naranja Tangelo", subtitle: "Tercera", Precio: 1000, Create_at: "11/10/23", avatar: Tangelo },
    { Id: "11", title: "Limon Tahiti", subtitle: "Tercera", Precio: 1000, Create_at: "11/10/23", avatar: Limon},
    { Id: "12", title: "Mandarina Oneco", subtitle: "Tercera", Precio: 1000, Create_at: "11/10/23", avatar: Mandarina },
  ];

  const handleAddToCart = (product) => {
    const existingProduct = cartItems.find((item) => item.Id === product.Id);
  
    if (existingProduct) {
      // Actualizar la cantidad si el producto ya está en el carrito
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.Id === product.Id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // Agregar un nuevo producto al carrito
      setCartItems((prevItems) => [...prevItems, { ...product, quantity: 1 }]);
    }
  };
  const [selectedposts, setSelectedposts] = useState(null);
  const handleOpenCart = () => {
    setOpenCart(true);
  };

  const handleCloseCart = () => {
    const currentDate = new Date();
    const dateString = currentDate.toLocaleDateString();
    const timeString = currentDate.toLocaleTimeString();
    const dateTimeString = `${dateString} ${timeString}`;
  
    const total = calculateTotal(); // Calcular el valor total actual
  
    setPurchasedItems((prevPurchasedItems) => {
      const updatedPurchasedItems = { ...prevPurchasedItems };
  
      if (!updatedPurchasedItems[dateTimeString]) {
        updatedPurchasedItems[dateTimeString] = {
          items: [],
          total: 0,
        };
      }
  
      updatedPurchasedItems[dateTimeString].items = [
        ...updatedPurchasedItems[dateTimeString].items,
        ...cartItems,
      ];
  
      updatedPurchasedItems[dateTimeString].total += parseFloat(total);
  
      return updatedPurchasedItems;
    });
  
    setCartItems([]);
    setOpenCart(false);
  };
  
  
  
  const handleIncreaseQuantity = (product) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.Id === product.Id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };
  
  const handleDecreaseQuantity = (product) => {
    if (product.quantity > 1) {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.Id === product.Id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    }
  };
  const handleRemoveFromCart = (product) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.Id !== product.Id)
    );
  };
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.Precio * item.quantity,
      0
    ).toFixed(2);
  };

  useEffect(() => {
    // Realiza acciones específicas según la opción seleccionada
    switch (selectedOption) {
      case "Tienda":
        // Lógica para la opción "Tienda"
        break;
      case "Mis Compras":
        // Lógica para la opción "Mis Compras"
        break;
      case "Mis Datos":
        // Lógica para la opción "Mis Datos"
        break;
      default:
        // Lógica por defecto o manejo de error
        break;
    }
  }, [selectedOption]);

  return (
    <div className='Tienda'>
      <h2>Tienda</h2>
    {selectedOption === "Tienda" && (  
    <div className='detal-products' >
    {post.map((posts) => (
    <Card
      key={posts.Id}
      className={
        selectedposts && selectedposts.Id && selectedposts.Id === posts.Id
      ? "active card"
      : "card"
      }
      >
      <CardMedia
        className="cardMedia-detal"
        component="img"
        src={posts.avatar}
        alt="green iguana"
      />
      <CardContent className="CardContent-deltal">
      <Typography gutterBottom variant="h5" component="div">
        {posts.title}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
        {posts.subtitle}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
        {posts.Precio}
        </Typography>
        <IconButton onClick={() => handleAddToCart(posts)}>
                <AddShoppingCartIcon />
              </IconButton>
        </CardContent>
      </Card>
      ))}

    <IconButton onClick={handleOpenCart}>
      <AddShoppingCartIcon />
    </IconButton>
    <Dialog open={openCart} onClose={handleCloseCart}>
  <DialogTitle>Carrito de Compras</DialogTitle>
  <DialogContent>
    <List>
      {cartItems.map((item, index) => (
        <ListItem key={index}>
          <ListItemText
            primary={item.title}
            secondary={`Cantidad: ${item.quantity} * Precio: ${item.Precio}`}
          />
          <IconButton onClick={() => handleIncreaseQuantity(item)}>
            <AddIcon />
          </IconButton>
          <IconButton onClick={() => handleDecreaseQuantity(item)}>
            <RemoveIcon />
          </IconButton>
          <IconButton onClick={() => handleRemoveFromCart(item)}>
            <DeleteIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
    <div>Total: {calculateTotal()}</div>
    <button>Finalizar compra</button>
    </DialogContent>
    </Dialog>
    </div>  
    )}
   {selectedOption === "Mis Compras" && (
    <div className='misCompras'>
      <h1>Mis compras</h1>
      <div className="compraContainer">
      {Object.entries(purchasedItems).map(([dateTime, { items, total }]) => (
        <div className="compraCard" key={dateTime}>
          <h3>{dateTime}</h3>
          <ul className="itemList">
            {items.map((item, index) => (
              <li className="item" key={index}>
                {item.title} - Cantidad: {item.quantity} * Precio: {item.Precio}
              </li>
            ))}
          </ul>
          <div className="total">Total: {total.toFixed(2)}</div>
        </div>
      ))}
    </div>
  </div>
  )}
  <div className='misDatos'>
      {selectedOption === "Mis Datos" && (
        <div>
          <h1>Mis datos</h1>
          {userData ? (
      <div>
        <p>Nombre: {userData.document}</p>
        <p>Email: {userData.email}</p>
        {/* Agrega más campos según la estructura de tus datos */}
      </div>
    ) : (
      <p>No se encontraron datos de usuario.</p>
    )}
        </div>
      )}
      </div>
  </div>
  );
};
