<script>
    import { onMount } from 'svelte';
  
    let tasks = [
      { id: 1, title: 'Bangun pagi', completed: false },
      { id: 2, title: 'Sholat subuh', completed: false },
      { id: 3, title: 'Makan bergizi', completed: false },
      { id: 4, title: 'Membaca buku', completed: false },
      { id: 5, title: 'Olahraga', completed: false },
      { id: 6, title: 'Membantu orang lain', completed: false },
      { id: 7, title: 'Tidur awal', completed: false }
    ];
  
    let activeTask = 0;
    let showChoice = false;
  
    function openTask(index) {
      activeTask = index;
      showChoice = true;
    }
  
    function acceptTask() {
      tasks[activeTask].completed = true;
      activeTask++;
      showChoice = false;
    }
  
    function rejectTask() {
      tasks.forEach(task => task.completed = false);
      activeTask = 0;
      showChoice = false;
    }
  </script>
  
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
  </div>
  