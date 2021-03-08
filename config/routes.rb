Rails.application.routes.draw do
  get 'hello_world', to: 'hello_world#index'
  root 'main#index'
  get 'foo/index'
  resources :fbi_documents
  get 'admin/documents', to: 'admin_documents#index'
  post 'admin/documents/:id/approve', to: 'admin_documents#approve'
  post 'admin/documents/:id/reject', to: 'admin_documents#reject'
  get '/admin/documents/:id/approval', to: 'admin_documents#review'
  get '/help', to: 'help#index'
  get 'editor', to: 'editor#index'
  post 'admin', to: 'admin_documents#login'
  post '/turk_documents/complete', to: 'turk_documents#complete'
  resources :turk_documents do 
    resources :fields
  end
end
