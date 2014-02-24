class EventInstancesController < ApplicationController

  def index
    start_date = params[:start_date]
    end_date = params[:end_date]
    event_id = params[:event_id]

    if start_date.empty? || end_date.empty?
      event_instances = EventInstance.where(event_id: event_id)
    else
      start_date = Date.parse(start_date)
      end_date = Date.parse(end_date)
      end_date = end_date + 2.days
      event_instances = EventInstance.where(
        event_id: event_id, 
        created_at: start_date..end_date
      )
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