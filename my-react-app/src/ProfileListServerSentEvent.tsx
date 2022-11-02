import React, { Component } from 'react';

interface Profile {
  id: number;
  email: string;
}

interface ProfileListProps {
}

interface ProfileListState {
  profiles: Array<Profile>;
  isLoading: boolean;
}

class ProfileListServerSentEvent extends Component<ProfileListProps, ProfileListState> {
  private interval: any; 

  constructor(props: ProfileListProps) {
    super(props);

    this.state = {
      profiles: [],
      isLoading: false
    };
  }

  async componentDidMount() {
    this.setState({isLoading: true});
    const response = await fetch('http://localhost:3000/profiles');
    const data = await response.json();
    this.setState({profiles: data, isLoading: false});

    const eventSource = new EventSource('http://localhost:8080/sse/profiles'); 
    eventSource.onopen = (event: any) => console.log('open', event); 
    eventSource.onmessage = (event: any) => {
      const profile = JSON.parse(event.data).source; 
      this.state.profiles.push(profile);
      this.setState({profiles: this.state.profiles}); 
    };
    eventSource.onerror = (event: any) => console.log('error', event);
  }
  
  render() {
    const {profiles, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    return (
      <div>
        <h2>Profile List</h2>
        {profiles.map((profile: Profile) =>
          <div key={profile.id}>
            {profile.email}<br/>
          </div>
        )}
        <a href="/" className="App-link">Home</a>
      </div>
    );
  }
}

export default ProfileListServerSentEvent;