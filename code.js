// Hello! :3
console.log("Hello! :3");

// Shortcuts?
function find(this_thing) {
  return document.querySelector(this_thing);
};

// Get list of nice stationary
let file_list = [
  "Acorn_Card_NH.png",
  "Airmail_Card_NH.png",
  "Baby-Goods_Card_NH.png",
  "Balloons_Card_NH.png",
  "Bandage_Card_NH.png",
  "Beach_Card_NH.png",
  "Birthday-Cake_Card_NH.png",
  "Blue-Sky_Card_NH.png",
  "Bunny_Day_Card_NH.png",
  "C.J._Card_NH.png",
  "Camo_Card_NH.png",
  "Carpet-Of-Leaves_Card_NH.png",
  "Cherry-Blossoms_Card_NH.png",
  "Chocolate-Heart_Card_NH.png",
  "Chocolate_Card_NH.png",
  "Common_Card_NH.png",
  "Cool-Cool_Card_NH.png",
  "Dandelion_Card_NH.png",
  "Dawning-Year_Card_NH.png",
  "Decorative_Card_NH.png",
  "Dodo_Airlines_Card_NH.png",
  "Elegant-Roses_Card_NH.png",
  "Fanciful_Card_NH.png",
  "Fantasy-Stars_Card_NH.png",
  "Father's_Day_Card_NH.png",
  "Festive-Tree_Card_NH.png",
  "Fireworks_Card_NH.png",
  "Flick_Card_NH.png",
  "Flight-Ticket_Card_NH.png",
  "Flower-Bouquet_Card_NH.png",
  "Fluffy-Clouds_Card_NH.png",
  "Full-Bloom_Card_NH.png",
  "Gears_Card_NH.png",
  "Gem_Card_NH.png",
  "Glowing-Moss_Card_NH.png",
  "Goldfish_Card_NH.png",
  "Graduation_Card_NH.png",
  "Graffiti_Card_NH.png",
  "Halloween_Card_NH.png",
  "Happy-Clovers_Card_NH.png",
  "Happy_Home_Academy_Card_NH.png",
  "Hibiscus_Card_NH.png",
  "Holiday_Card_NH.png",
  "Jolly_Redd_Card_NH.png",
  "K.K._Slider_Card.png",
  "Lovely_Hearts_Card_NH.png",
  "Mother's_Day_Card_NH.png",
  "Mushroom_Card_NH.png",
  "Nook_Card_NH.png",
  "Nook_Mileage_Card_NH.png",
  "Nook_Shopping_Gift_Card_NH.png",
  "Paradise_Planning_Card_NH.png",
  "Plumeria_Card_NH.png",
  "Pumpkin_Card_NH.png",
  "Red-Dragonflies_Card_NH.png",
  "Ribbon_Card_NH.png",
  "Shapes_Card_NH.png",
  "Shooting-Stars_Card_NH.png",
  "Snowflake_Card_NH.png",
  "Snowperson_Card_NH.png",
  "So-Many-Hearts_Card_NH.png",
  "Star_Card_NH.png",
  "Stationery-Goods_Card_NH.png",
  "Sunset_Card_NH.png",
  "Torn_Card_NH.png",
  "Town-View_Card_NH.png",
  "Tropical_Card_NH.png",
  "Turkey_Day_Card_NH.png",
  "Unknown_Paradise_Planning_Card_NH.png",
  "Velvety_Card_NH.png",
  "Warm-Sweater_Card_NH.png",
  "Wedding_Card_NH.png",
  "Winter-Camellia_Card_NH.png",
  "Zen_Card_NH.png",
];

// Defaults
let default_color = "#74664b";

// Generate Menu
let temp_gen_html_img = "";
for (let index = 0; index < file_list.length; index++) {
  let temp_this_image = file_list[index];
  // We have to use this with ID, we can't pass string with onclick.
  temp_gen_html_img = temp_gen_html_img + `<a href="#" id="${temp_this_image}" onclick="select_image(this.id)"><img src="./t_stationary/${temp_this_image}"></a> `;
}

let menu_image = document.querySelector(".image-select-menu");
menu_image.innerHTML = temp_gen_html_img;

// Canvas Setup
var canvas = document.querySelector('#viewport')
var ctx = canvas.getContext('2d');
ctx.clearRect(0, 0, canvas.width, canvas.height);
  var base_image = new Image();
  base_image.src = `./stationary/none.png`;
  base_image.onload = function(){
    // Draw the background stationary
    ctx.drawImage(base_image, 0, 0);
  }

// Functions
// Function - Word Wrap 

const wrapText = (ctx, text, x, y, maxWidth, lineHeight) => {
  ctx.textAlign = "start"; 
  text = text.replaceAll("\n", " [nl] ")
  const words = text.split(' ');
  let line = '';
  for (const [index, w] of words.entries()) {
    let this_word = w;
    let this_space = ' ';
    let testWidth = 0;
    if (this_word == "[nl]") {
      this_word = "";
      this_space = "";
      testWidth = 9999;
    }
    const testLine = line + this_word + this_space;
    const metrics = ctx.measureText(testLine);
    testWidth = testWidth + metrics.width;
  
    if (testWidth > maxWidth && index > 0) {
      ctx.fillText(line, x, y);
      line = this_word + this_space;
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}



// Function - Select Image 
function select_image(image_name = "none.png") {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var base_image = new Image();
  base_image.src = `./stationary/${image_name}`;
  base_image.onload = function(){
    // Draw the background stationary
    ctx.drawImage(base_image, 0, 0);

    // Set up font
    ctx.font         = '42px lettersmall';
    ctx.fontKerning  = 'normal';
    ctx.fillStyle = find('.letter-to-color').value;
    ctx.textBaseline = 'top';

    // To field
    ctx.textAlign = "start"; 
    ctx.fillText(find('.letter-to').value, 142, 88);

    // Message Body
    ctx.fillStyle = find('.letter-message-color').value;
    wrapText(ctx, find('.letter-message').value, 210, 225, (1230 - 420), 56);

   // From field
   ctx.fillStyle = find('.letter-from-color').value;
   ctx.textAlign = "end"; 
   ctx.fillText(find('.letter-from').value, 1090, (780 - 88 - 22));


  }

}

function download() {
  var canvas = document.querySelector('#viewport')
  var img    = canvas.toDataURL("image/png");
  document.write('<img src="'+img+'"/>');
}

