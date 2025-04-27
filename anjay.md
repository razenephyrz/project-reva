<div class="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-300 to-pink-400">
    <div class="w-80 p-6 rounded-2xl bg-white/10 backdrop-blur-md flex flex-col items-center space-y-6">
      <h1 class="text-4xl font-bold text-white">Speedy</h1>
  
      <button class="btn btn-circle bg-yellow-400 hover:bg-yellow-300" on:click={playGame}>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-5.197-3.028A1 1 0 008 9.028v5.944a1 1 0 001.555.832l5.197-3.028a1 1 0 000-1.664z" />
        </svg>
      </button>
  
      <button class="btn bg-sky-400 hover:bg-sky-300 text-white w-full" on:click={openLeaderboard}>
        Leaderboard
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

  <!-- page 2 -->
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