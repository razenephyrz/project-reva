<script lang="ts">
  import { onMount } from 'svelte'; // kalau pakai Svelte

  onMount(() => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch((err) => {
        console.error('Service Worker registration failed:', err);
      });
  }

  document.addEventListener('click', async () => {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      new Notification('Mr. Masa Depan', {
        body: 'Lakukanlah tugas ini jika tidak ingin menyesal',
      });
    }
  }, { once: true });
});
let progress = 0;

    type Task = {
    id: number;
    title: string;
    completed: boolean | undefined;
    };
    let showFailedScreen = false; 
    let page = 0;
    let tasks = [
      { id: 1, title: 'Bangun pagi', completed: undefined },
      { id: 2, title: 'Sholat subuh', completed: undefined },
      { id: 3, title: 'Makan bergizi', completed: undefined },
      { id: 4, title: 'Membaca buku', completed: undefined },
      { id: 5, title: 'Olahraga', completed: undefined },
      { id: 6, title: 'Membantu orang lain', completed: undefined },
      { id: 7, title: 'Tidur awal', completed: undefined }
    ];
  
    let activeTask = 0;
    let showChoice = false;
  
    function openTask(index: number) {
      activeTask = index;
      showChoice = true;
    }
  
    function acceptTask() {
  tasks[activeTask].completed = true;
  activeTask++;
  progress = (tasks.filter(task => task.completed).length / tasks.length) * 100;
  showChoice = false;
}
  
    function rejectTask() {
  showChoice = false;
  showFailedScreen = true;

  setTimeout(() => {
    tasks = tasks.map(task => ({ ...task, completed: undefined }));
    activeTask = 0;
    progress = 0; // <-- Reset progress ke 0%
    showFailedScreen = false;
  }, 2000);
};

  </script>
  {#if page == 0}
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#3B2F2F] to-[#A67B5B]">
    <div class="w-80 p-6 rounded-2xl bg-white/10 backdrop-blur-md flex flex-col items-center space-y-6 shadow-2xl">
      <h1 class="text-4xl font-bold text-white">Mr Masa Depan</h1>

      <button class="btn bg-[#C68642] hover:bg-[#D7A86E] text-white w-full" name="buttonStart" on:click={() => page = 1}>
        Start
      </button>

      <div class="flex justify-center space-x-6">
        <button class="btn btn-circle bg-[#C68642] hover:bg-[#D7A86E]">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A3 3 0 007 20h10a3 3 0 002.879-2.196M15 11a4 4 0 01-8 0m8 0a4 4 0 10-8 0m8 0h-8" />
          </svg>
        </button>

        <button class="btn btn-circle bg-[#C68642] hover:bg-[#D7A86E]">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6l4 2" />
          </svg>
        </button>

        <button class="btn btn-circle bg-[#C68642] hover:bg-[#D7A86E]">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 8a6 6 0 00-12 0c0 1.657 1.343 3 3 3h6c1.657 0 3-1.343 3-3z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 14h12l-6 6-6-6z" />
          </svg>
        </button>
      </div>
    </div>
  </div>

  {:else}
  <div class="min-h-screen bg-gradient-to-b from-[#5C4033] via-[#C68642] to-[#79735b] flex flex-col items-center p-6">
    <div class="w-full max-w-md space-y-6">

      <div><h1 class="text-3xl text-white font-bold text-center mt-4">Hello, Ucup</h1></div>
      <div class="text-center text-[#F5F3EB] italic">Saturday, August 3</div>

      <div class="card bg-white/20 backdrop-blur-lg shadow-xl rounded-3xl">
        <div class="card bg-white/50 backdrop-blur-xl shadow-md p-5 flex items-center space-x-4 rounded-2xl">
          <div class="w-20 h-20 rounded-xl overflow-hidden bg-gray-300 flex-shrink-0 border-4 border-[#A67B5B]">
            <img src="/your-image-path/IMG-20250427-WA0005.jpg" alt="Foto Ucup" class="object-cover w-full h-full" />
          </div>

          <div class="flex flex-col w-full">
            <div class="space-y-1">
              <div class="font-bold text-lg text-[#5C4033]">Ucup</div>
              <div class="text-xs text-[#5C4033]/80">Umur: 17 tahun</div>
              <div class="text-xs text-[#5C4033]/80">Kelas: 12 IPA 3</div>
              <div class="text-xs text-[#5C4033]/80">Agama: Islam</div>
            </div>

            <div class="mt-3">
              <div class="w-full bg-[#D7A86E]/60 rounded-full h-3 overflow-hidden">
                <div 
                  class="bg-gradient-to-r from-[#D4A373] via-[#F5F3EB] to-[#A67B5B] h-3 transition-all duration-500"
                  style="width: {progress}%"
                ></div>
              </div>
              <div class="text-xs text-[#5C4033]/80 text-right mt-1">
                {Math.round(progress)}%
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card bg-white/20 backdrop-blur-lg shadow-lg p-5 space-y-4 rounded-3xl">
        <div class="flex items-center justify-between">
          <div class="font-semibold text-white">To-Do</div>
          <div class="badge bg-[#A67B5B]/80 text-white">Ongoing</div>
        </div>

        <p class="text-xs text-[#F5F3EB] italic text-center">
          kerjakan task ini jika kamu tidak ingin menyesal
        </p>

        {#each tasks as task, index}
        <div class="flex items-center gap-3 p-2 rounded-2xl hover:bg-[#F5F3EB]/10 cursor-pointer transition" on:click={() => openTask(index)}>
          <input type="checkbox" class="checkbox checkbox-success bg-[#C68642]" bind:checked={task.completed} disabled />
          <span class={task.completed ? 'line-through text-gray-400' : 'text-white'}>
            {index + 1}. {task.title}
          </span>
        </div>
        {/each}
      </div>

    </div>

    {#if showChoice}
      <div class="fixed inset-0 bg-black/40 flex justify-center items-center">
        <div class="bg-white/90 p-6 rounded-2xl shadow-2xl space-y-4 w-72">
          <div class="text-center font-bold text-[#5C4033]">Task: {tasks[activeTask].title}</div>
          <div class="flex justify-around">
            <button class="btn btn-success bg-[#7D8F69] hover:bg-green-500" on:click={acceptTask}>Terima</button>
            <button class="btn btn-error bg-[#C3423F] hover:bg-red-400" on:click={rejectTask}>Tolak</button>
          </div>
        </div>
      </div>
    {/if}

    {#if showFailedScreen}
      <div class="fixed inset-0 bg-[#C3423F] flex justify-center items-center">
        <div class="text-4xl font-bold text-white animate-bounce">You're Failed!</div>
      </div>
    {/if}

  </div>
{/if}

  
  