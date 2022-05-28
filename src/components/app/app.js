import React from 'react';
import '../../index.css';
import Content from '../content/content';
import Front from '../front/front';
import Header from '../header/header';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.throttle = this.throttle.bind(this);
        this.coordY = this.coordY.bind(this);
        //this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.state = {
          scroll: window.scrollY 
        };
        this.throttleTimer = false;
    }

    coordY() {
      if(this.throttleTimer === true) {
        return this.setState({scroll: window.scrollY}) 
      }else return;
    };
    throttle (callback, time) {
      if (this.throttleTimer) return;
      
      this.throttleTimer = true;
      
      setTimeout(() => {
          callback();
          this.throttleTimer = false;
      }, time);
    }

    componentDidMount() {
      this.numero = Math.round(50/this.state.scroll+2);
      window.addEventListener('scroll' , ()=>this.throttle(this.coordY , 300));
    }
/*     componentWillUnmount() {
      console.log('activado');
      window.removeEventListener('scroll', ()=>this.throttle());
    } */
/*ARREGLOS: Mi gran problema aca es que scrolleando cambio el estado del componente principal
por ende renderizo a los hijos (TODO en resumen) con cada scrolleo, mientras mas grande sea el proyecto este problema va a ser mayor
tengo que buscar una manera de que pueda saber y utilizar el estado del scrolleo para usarlo en todos los hijos sin renderizalors a los que
no tienen nada que ver con esto 🥐*/
    render() {
        return (
          <div style={{
            position: 'relative',
          }} 
          className='Princial'>
            <Front border={this.state.scroll}/>
            <Header scroll={this.state.scroll}/>
            <Content/>
          </div>
        );
    }
}

export default App;