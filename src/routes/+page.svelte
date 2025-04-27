<script lang="ts">
    import { onMount } from 'svelte';
    onMount(() => {
  if ('Notification' in window) {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        new Notification('Halo Ucup!', {
          body: 'Semangat jalani harimu 💪✨',
          icon: '/path-to-your-icon.png' // opsional, bisa kosong
        });
      }
    });
  }
});
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
      showChoice = false;
    }
  
    function rejectTask() {
  showChoice = false;
  showFailedScreen = true;

  setTimeout(() => {
    tasks.forEach(task => task.completed = false);
    activeTask = 0;
    showFailedScreen = false;
  }, 2000); // 2 detik delay
}
  </script>
  {#if page == 0}
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-300 to-pink-400">
    <div class="w-80 p-6 rounded-2xl bg-white/10 backdrop-blur-md flex flex-col items-center space-y-6">
      <h1 class="text-4xl font-bold text-white">Mr Masa Depan</h1>
  
      <button class="btn bg-sky-400 hover:bg-sky-300 text-white w-full" on:click={() => page = 1}>
        Start
      </button>
  
      <div class="flex justify-center space-x-6">
        <button class="btn btn-circle bg-lime-400 hover:bg-lime-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A3 3 0 007 20h10a3 3 0 002.879-2.196M15 11a4 4 0 01-8 0m8 0a4 4 0 10-8 0m8 0h-8" />
          </svg>
        </button>
  
        <button class="btn btn-circle bg-lime-400 hover:bg-lime-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6l4 2" />
          </svg>
        </button>
  
        <button class="btn btn-circle bg-lime-400 hover:bg-lime-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 8a6 6 0 00-12 0c0 1.657 1.343 3 3 3h6c1.657 0 3-1.343 3-3z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 14h12l-6 6-6-6z" />
          </svg>
        </button>
      </div>
    </div>
  </div>
  {:else}
  <div class="min-h-screen bg-neutral-100 flex flex-col items-center p-6">
    <div class="w-full max-w-md space-y-6">
      <div class="text-2xl font-bold text-center mt-4">Hello, Ucup</div>
      <div class="text-center text-gray-500">Saturday, August 3</div>
  
      <div class="card bg-pink-200 shadow-lg">
        <div class="card-body items-center">
          <div class="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center">
            <!-- Placeholder Foto -->
            <span class="text-4xl">👤</span>
          </div>
          <div class="mt-2 text-lg font-semibold">Mr. Masa Depan</div>
          <div class="text-sm text-gray-600">ID: 123456789</div>
          <div class="text-sm text-gray-600">Life: 🌟</div>
        </div>
      </div>
  
      <div class="card bg-white shadow-md p-4 space-y-4">
        <div class="flex items-center justify-between">
          <div class="font-semibold text-black">To-Do</div>
          <div class="badge badge-primary">Ongoing</div>
        </div>
  
        <p class="text-xs text-black italic text-center">
          kerjakan task ini jika kamu tidak ingin menyesal
        </p>
  
        {#each tasks as task, index}
        <div class="flex items-center gap-3 p-2 rounded-2xl hover:bg-gray-100 cursor-pointer transition"on:click={() => openTask(index)}>
            <input type="checkbox" class="checkbox checkbox-success bg-green-400" bind:checked={task.completed} disabled />
            <span class={task.completed ? 'line-through text-gray-400' : 'text-gray-700'}>
             {index + 1}. {task.title}
            </span>
        </div>
        {/each}
      </div>
    </div>
  
    {#if showChoice}
      <div class="fixed inset-0 bg-black/30 flex justify-center items-center">
        <div class="bg-white p-6 rounded-2xl shadow-xl space-y-4 w-72">
          <div class="text-center font-bold text-black">Task: {tasks[activeTask].title}</div>
          <div class="flex justify-around">
            <button class="btn btn-success bg-green-600" on:click={acceptTask}>Terima</button>
            <button class="btn btn-error bg-red-600" on:click={rejectTask}>Tolak</button>
          </div>
        </div>
      </div>
    {/if}
    {#if showFailedScreen}
  <div class="fixed inset-0 bg-red-500 flex justify-center items-center">
    <div class="text-4xl font-bold text-white">You're Failed!</div>
  </div>
{/if}

  </div>
  
  {/if}
  
  