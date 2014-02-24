class EventInstancesController < ApplicationController

  def index
    start_date ||= Date.parse(params[:start_date])
    end_date ||= Date.parse(params[:end_date])
    event_id = params[:event_id]

    if start_date.nil? || end_date.nil?
      event_instances = EventInstance.where(event_id: event_id)
    else
      event_instances = EventInstance.where(event_id: event_id, created_at: start_date..end_date)
    end

    render json: event_instances
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