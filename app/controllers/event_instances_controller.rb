class EventInstancesController < ApplicationController

  def index
    event = Event.find(params[:event_id])

    render json: event.event_instances
  end

  def create
    event = Event.find(params[:event_id])
    new_event_instance = event.event_instances.new

    if new_event_instance.save
      render json: new_event_instance
    else
      render :json => { :errors => new_event_instance.errors.full_messages }, :status => 422
    end
  end

end