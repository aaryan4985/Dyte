const navbar = document.querySelector('.header.navbar');
const menu = document.querySelector('#menu');

menu.onclick = () => {
  menu.classList.toggle('fa-times');
  navbar.classList.toggle('active');
};

window.onscroll = () => {
  menu.classList.remove('fa-times');
  navbar.classList.remove('active');
};

const chatbot = document.querySelector('.chatbot');
const chatInput = document.querySelector('.chat-input textarea');
const sendBtn = document.getElementById('send-btn');
const chatIcon = document.getElementById('chat-icon');

// Toggle chatbot visibility on chat icon click
chatIcon.addEventListener('click', () => {
  chatbot.style.display = chatbot.style.display === 'none'? 'block' : 'none';
});

// Send message function
const sendMessage = async () => {
  const userInput = chatInput.value;
  if (userInput.trim()!== '') {
    const chatbox = document.querySelector('.chatbox');

    // Append user message to chatbox
    chatbox.innerHTML += `
      <div class="chat outgoing">
        <p>${userInput}</p>
      </div>
    `;

    // Clear the chat input textarea after sending the message
    chatInput.value = '';

    // Scroll chatbox to bottom
    chatbox.scrollTop = chatbox.scrollHeight;

    try {
      const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_API_KEY' // Replace YOUR_API_KEY with your actual API key
        },
        body: JSON.stringify({
          model: 'text-davinci-003',
          prompt: `You: ${userInput}\nAssistant:`,
          max_tokens: 50,
          temperature: 0.5,
          top_p: 1
        })
      });

      try {
        // API request code
      } catch (error) {
        console.error('Error:', error);
        // Handle error (e.g., display error message to the user)
      }
      

      if (!response.ok) {
        throw new Error('Failed to fetch response from OpenAI API');
      }

      const data = await response.json();
      const chatbotResponse = data.choices[0].text;

      // Append chatbot response to chatbox
      chatbox.innerHTML += `
        <div class="chat incoming">
          <span class="material-symbols-outlined">
            <img src="health_icon.png" alt="Health Icon" />
          </span>
          <p>${chatbotResponse}</p>
        </div>
      `;

      // Scroll chatbox to bottom after receiving chatbot response
      chatbox.scrollTop = chatbox.scrollHeight;
    } catch (error) {
      console.error('Error fetching response:', error);
      // Handle error
    }
  }
};

// Send message on button click
sendBtn.addEventListener('click', sendMessage);

// Send message on Enter key press
chatInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' &&!event.shiftKey) {
    event.preventDefault(); // Prevent newline
    sendMessage();
  }
});

$(document).ready(function() {
  $(".buttons").click(function() {
    $(this).addClass("active").siblings().removeClass('active');

    var filter = $(this).attr('data-filter');

    if (filter == 'all') {
      $('.diet.box').show(400);
    } else {
      $('.diet.box').not('.' + filter).hide(200);
      $('.diet.box').filter('.' + filter).show(400);
    }
  });
});

var swiper = new Swiper('.review-slider', {
  loop: true,
  grabCursor: true,
  spaceBetween: 20,
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    740: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    }
  },
  pagination: {
    el: '.swiper-pagination',
  }
});
