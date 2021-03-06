Rails.application.routes.draw do
  get 'hello_world', to: 'hello_world#index'
  root 'main#index'
  get 'foo/index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :fbi_documents
  get 'admin/documents', to: 'admin_documents#index'
  get 'editor', to: 'editor#index'
  post 'admin', to: 'admin_documents#login'
  post '/turk_documents/complete', to: 'turk_documents#complete'
  resources :turk_documents do 
    resources :fields
  end
end
