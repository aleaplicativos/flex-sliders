console.clear();

function RangeControl(opts = { min: 0, max: 100, step: 1, onUpdate: ()=>{} }) {

  let { onUpdate, ...attrs } = opts;

  this.el = document.createElement('input');
  this.onUpdate = onUpdate;

  attrs['type'] = 'range';
  for (var key in attrs){
    this.el.setAttribute(key, attrs[key]);
  }

  this.el.addEventListener('input', ()=>{   
    this.value = this.el.value;
    this.onUpdate(this.value) 
  });
  this.onUpdate(this.el.value);

  return this;

}


function StyleRanger(
  {el, property, onUpdate, ...attrs}
    = { el: document.body, onUpdate: ()=>{} }
  ) {
  console.log(el);
  if ( !el ) { return; }

  let range = new RangeControl({ 
    ...attrs,
    onUpdate: function(value){
      el.style.setProperty(property, value);
      if ( onUpdate ) { onUpdate(value); }
    }
  });

  el.classList.add('style-range');
  el.appendChild(range.el);

  return { el, range };
}


let arms = [...document.querySelectorAll('.arm')];
let armControls = arms.map( 
  el => new StyleRanger({
    el,
    min: -30, 
    max: 70, 
    step: 1, 
    value: 20,
    orient: 'vertical',
    property: '--bend'
  })
);


let legs = [...document.querySelectorAll('.leg')];
let legControls = legs.map( 
  
  el => new StyleRanger({
    el,
    min: -50, 
    max: 20, 
    step: 1, 
    value: 20,
    orient: 'vertical',
    property: '--bend'
  })
  
);



let headControls = ['X','Y'].map( 
  dir => new StyleRanger({

    


  }) 
);


let sceneYControl = new StyleRanger({
  el: document.querySelector('.scene'),
  min: -360, 
  max: 360, 
  step: 1, 
  value: -20,
  property: '--rotateY'
});

let sceneXControl = new StyleRanger({
  el: document.querySelector('.scene'),
  min: -360, 
  max: 360, 
  step: 1, 
  value: -20,
  orient: 'vertical',
  property: '--rotateX'
});