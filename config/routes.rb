EventTracker::Application.routes.draw do

  resources :events do
    resources :event_instances
  end

end
