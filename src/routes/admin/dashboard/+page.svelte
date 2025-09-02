<script>
  import { enhance } from '$app/forms';
  import { goto } from '$app/navigation';
  
  export let data;
  export let form;
  
  let showAddForm = false;
  let editingQuestion = null;
  let newQuestion = {
    question: '',
    options: ['', '', '', ''],
    correct_answer: 0
  };
  
  function resetForm() {
    newQuestion = {
      question: '',
      options: ['', '', '', ''],
      correct_answer: 0
    };
    showAddForm = false;
    editingQuestion = null;
  }
  
  function editQuestion(question) {
    editingQuestion = question;
    newQuestion = {
      question: question.question,
      options: JSON.parse(question.options),
      correct_answer: question.correct_answer
    };
    showAddForm = true;
  }
  
  function logout() {
    fetch('/admin/logout', { method: 'POST' })
      .then(() => goto('/admin'));
  }
</script>

<div class="min-h-screen bg-surface-50-900-token">
  <!-- Header -->
  <div class="bg-surface-100-800-token border-b border-surface-300-600-token">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center py-6">
        <div>
          <h1 class="text-3xl font-bold text-primary-500">Admin Dashboard</h1>
          <p class="text-surface-600-300-token">Manage citizenship test questions</p>
        </div>
        <div class="flex items-center gap-4">
          <span class="text-sm text-surface-600-300-token">
            Total Questions: {data.questions.length}
          </span>
          <button
            on:click={logout}
            class="btn variant-ghost-error"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Main Content -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    
    {#if form?.success}
      <div class="alert variant-filled-success mb-6">
        <div class="alert-message">
          <p>{form.message}</p>
        </div>
      </div>
    {/if}
    
    {#if form?.error}
      <div class="alert variant-filled-error mb-6">
        <div class="alert-message">
          <p>{form.error}</p>
        </div>
      </div>
    {/if}
    
    <!-- Add Question Button -->
    <div class="mb-8">
      <button
        on:click={() => showAddForm = !showAddForm}
        class="btn variant-filled-primary"
      >
        {showAddForm ? 'Cancel' : 'Add New Question'}
      </button>
    </div>
    
    <!-- Add/Edit Question Form -->
    {#if showAddForm}
      <div class="card variant-filled-surface p-6 mb-8">
        <h2 class="text-xl font-bold mb-4">
          {editingQuestion ? 'Edit Question' : 'Add New Question'}
        </h2>
        
        <form method="POST" action="?/{editingQuestion ? 'update' : 'add'}" use:enhance={() => {
          return async ({ result }) => {
            if (result.type === 'success') {
              resetForm();
            }
          };
        }}>
          {#if editingQuestion}
            <input type="hidden" name="id" value={editingQuestion.id} />
          {/if}
          
          <div class="space-y-6">
            <div>
              <label for="question" class="label">
                <span class="text-sm font-medium">Question</span>
              </label>
              <textarea
                id="question"
                name="question"
                bind:value={newQuestion.question}
                required
                rows="3"
                class="textarea variant-form-material w-full"
                placeholder="Enter the question..."
              ></textarea>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              {#each newQuestion.options as option, index}
                <div>
                  <label for="option_{index}" class="label">
                    <span class="text-sm font-medium">Option {String.fromCharCode(65 + index)}</span>
                  </label>
                  <input
                    type="text"
                    id="option_{index}"
                    name="option_{index}"
                    bind:value={newQuestion.options[index]}
                    required
                    class="input variant-form-material w-full"
                    placeholder="Enter option {String.fromCharCode(65 + index)}..."
                  />
                </div>
              {/each}
            </div>
            
            <div>
              <label for="correct_answer" class="label">
                <span class="text-sm font-medium">Correct Answer</span>
              </label>
              <select
                id="correct_answer"
                name="correct_answer"
                bind:value={newQuestion.correct_answer}
                class="select variant-form-material w-full"
              >
                {#each newQuestion.options as option, index}
                  <option value={index}>
                    {String.fromCharCode(65 + index)}: {option || `Option ${String.fromCharCode(65 + index)}`}
                  </option>
                {/each}
              </select>
            </div>
            
            <div class="flex gap-4">
              <button
                type="submit"
                class="btn variant-filled-primary"
              >
                {editingQuestion ? 'Update Question' : 'Add Question'}
              </button>
              <button
                type="button"
                on:click={resetForm}
                class="btn variant-ghost-surface"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    {/if}
    
    <!-- Questions List -->
    <div class="space-y-4">
      <h2 class="text-2xl font-bold text-primary-500 mb-4">All Questions</h2>
      
      {#each data.questions as question, index}
        <div class="card variant-filled-surface p-6">
          <div class="flex justify-between items-start mb-4">
            <div class="flex-1">
              <h3 class="text-lg font-semibold mb-2">
                Question #{question.id}: {question.question}
              </h3>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                {#each JSON.parse(question.options) as option, optionIndex}
                  <div class="flex items-center gap-2">
                    <span class="badge {optionIndex === question.correct_answer ? 'variant-filled-success' : 'variant-soft-surface'}">
                      {String.fromCharCode(65 + optionIndex)}
                    </span>
                    <span class="{optionIndex === question.correct_answer ? 'font-semibold text-success-500' : ''}">
                      {option}
                    </span>
                    {#if optionIndex === question.correct_answer}
                      <span class="text-success-500">✓</span>
                    {/if}
                  </div>
                {/each}
              </div>
              
              <p class="text-sm text-surface-600-300-token">
                Correct Answer: {String.fromCharCode(65 + question.correct_answer)}
              </p>
            </div>
            
            <div class="flex gap-2 ml-4">
              <button
                on:click={() => editQuestion(question)}
                class="btn variant-ghost-primary btn-sm"
              >
                Edit
              </button>
              
              <form method="POST" action="?/delete" use:enhance>
                <input type="hidden" name="id" value={question.id} />
                <button
                  type="submit"
                  class="btn variant-ghost-error btn-sm"
                  on:click={(e) => {
                    if (!confirm('Are you sure you want to delete this question?')) {
                      e.preventDefault();
                    }
                  }}
                >
                  Delete
                </button>
              </form>
            </div>
          </div>
        </div>
      {/each}
      
      {#if data.questions.length === 0}
        <div class="text-center py-12">
          <p class="text-surface-600-300-token text-lg">No questions found. Add some questions to get started!</p>
        </div>
      {/if}
    </div>
  </div>
</div>